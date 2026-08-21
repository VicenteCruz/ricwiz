"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMergeConflict = handleMergeConflict;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const git_1 = require("./git");
async function handleMergeConflict(cwd, sourceStr, targetStr, progress) {
    if (progress) {
        progress.report({ message: `CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel.` });
    }
    let isResolved = false;
    let abortRequested = false;
    const getDeletionConflicts = async () => {
        try {
            const { stdout } = await (0, git_1.exec)('git status --porcelain', { cwd });
            return stdout.split('\n')
                .filter((line) => {
                const state = line.substring(0, 2);
                return ['UD', 'DU', 'DD', 'AU', 'UA'].includes(state);
            })
                .map((line) => line.substring(3).trim());
        }
        catch (e) {
            return [];
        }
    };
    const getUnmergedFilesData = async () => {
        try {
            const { stdout } = await (0, git_1.exec)('git status --porcelain', { cwd });
            const mapState = (state) => {
                if (state === 'UU')
                    return 'Both Modified';
                if (state === 'UD')
                    return 'Deleted by them';
                if (state === 'DU')
                    return 'Deleted by us';
                if (state === 'DD')
                    return 'Both Deleted';
                if (state === 'AA')
                    return 'Both Added';
                if (state === 'AU')
                    return 'Added by us';
                if (state === 'UA')
                    return 'Added by them';
                return 'Conflicted';
            };
            return stdout.split('\n')
                .map(line => line.trimRight())
                .filter(line => line.length > 2)
                .filter(line => {
                const state = line.substring(0, 2);
                return ['UU', 'AA', 'UD', 'DU', 'AU', 'UA', 'DD'].includes(state);
            })
                .map(line => {
                const stateCode = line.substring(0, 2);
                const file = line.substring(3).trim();
                return { file, state: mapState(stateCode) };
            });
        }
        catch (e) {
            return [];
        }
    };
    const updateWebviewState = async () => {
        if (isResolved)
            return;
        const deletions = await getDeletionConflicts();
        const allConflicts = await getUnmergedFilesData();
        const { webviewProvider } = require('./extension');
        if (webviewProvider) {
            webviewProvider.setConflictState({
                isConflict: true,
                sourceStr,
                targetStr,
                deletionsCount: deletions.length,
                files: allConflicts
            });
        }
    };
    const conflictActionDisposable = vscode.commands.registerCommand('ricwiz.conflictAction', async (action) => {
        if (action === 'abortDeploy') {
            abortRequested = true;
        }
        else if (action === 'resolveDeletions') {
            try {
                const deletions = await getDeletionConflicts();
                const items = deletions.map((file) => ({ label: file }));
                const toDelete = await vscode.window.showQuickPick(items, {
                    canPickMany: true,
                    placeHolder: 'Select conflicted files to DELETE',
                    title: 'Ricwiz: Delete Conflicted Files'
                });
                if (toDelete && toDelete.length > 0) {
                    for (const item of toDelete) {
                        try {
                            await (0, git_1.exec)(`git rm --force "${item.label}"`, { cwd });
                        }
                        catch (e) { }
                    }
                    vscode.window.showInformationMessage(`Ricwiz: Deleted ${toDelete.length} conflicted file(s).`);
                }
            }
            catch (e) {
                vscode.window.showErrorMessage(`Ricwiz: Error. (${e.message})`);
            }
            updateWebviewState();
        }
        else if (action === 'commitAndContinue') {
            try {
                const deletions = await getDeletionConflicts();
                const keptFiles = deletions.filter((file) => fs.existsSync(path.join(cwd, file)));
                if (keptFiles.length > 0) {
                    const confirm = await vscode.window.showWarningMessage(`Wait! There are ${keptFiles.length} file(s) with deletion conflicts that are still on your disk.\n\nIf you commit now, you will KEEP them in the project.\n\nAre you sure you want to KEEP them?`, { modal: true }, 'Yes, KEEP them', 'No, let me DELETE them');
                    if (confirm !== 'Yes, KEEP them') {
                        updateWebviewState();
                        return;
                    }
                }
                let hasMarkers = false;
                try {
                    const { stdout } = await (0, git_1.exec)(`git grep -E "^<<<<<<< "`, { cwd });
                    if (stdout.trim().length > 0)
                        hasMarkers = true;
                }
                catch (e) { }
                if (hasMarkers) {
                    vscode.window.showErrorMessage('Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!');
                    updateWebviewState();
                    return;
                }
                await (0, git_1.exec)('git add .', { cwd });
                await (0, git_1.exec)('git commit --no-edit', { cwd });
            }
            catch (e) {
                vscode.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${e.message})`);
                updateWebviewState();
            }
        }
    });
    updateWebviewState();
    while (true) {
        if (abortRequested) {
            isResolved = true;
            conflictActionDisposable.dispose();
            require('./extension').webviewProvider?.setConflictState(null);
            try {
                await (0, git_1.exec)('git merge --abort', { cwd });
            }
            catch (err) { }
            return false;
        }
        try {
            const { stdout } = await (0, git_1.exec)('git status --porcelain', { cwd });
            if (stdout.trim().length === 0) {
                isResolved = true;
                conflictActionDisposable.dispose();
                require('./extension').webviewProvider?.setConflictState(null);
                vscode.window.showInformationMessage(`Ricwiz: Changes committed!`);
                return true;
            }
        }
        catch (e) { }
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}
//# sourceMappingURL=conflictResolver.js.map
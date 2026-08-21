export class Security {
    /**
     * Validates if a string is safe to be interpolated directly into shell commands.
     * Prevents Command Injection by allowing only strict alphanumeric patterns, hyphens, underscores, slashes, and dots.
     * Blocks spaces, semicolons, ampersands, pipes, backticks, quotes, and other dangerous characters.
     */
    static isValidShellArg(arg: string): boolean {
        if (!arg) {
            return false;
        }
        return /^[a-zA-Z0-9\-_/.]+$/.test(arg);
    }
}

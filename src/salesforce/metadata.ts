/**
 * Salesforce Metadata extraction and mapping utilities.
 */

export interface ParsedMetadataInfo {
    type: string;
    name: string;
}

/**
 * Parses a workspace file path into its Salesforce metadata type and member name.
 * Returns null if the file does not match recognized Salesforce metadata paths.
 */
export function parseMetadataFromPath(filePath: string): ParsedMetadataInfo | null {
    const normalized = filePath.replace(/\\/g, '/');

    if (normalized.includes('/classes/')) {
        const match = normalized.match(/\/classes\/([^/.]+)\.cls/);
        if (match) return { type: 'ApexClass', name: match[1] };
    }
    if (normalized.includes('/triggers/')) {
        const match = normalized.match(/\/triggers\/([^/.]+)\.trigger/);
        if (match) return { type: 'ApexTrigger', name: match[1] };
    }
    if (normalized.includes('/lwc/')) {
        const match = normalized.match(/\/lwc\/([^/]+)\//);
        if (match) return { type: 'LightningComponentBundle', name: match[1] };
    }
    if (normalized.includes('/aura/')) {
        const match = normalized.match(/\/aura\/([^/]+)\//);
        if (match) return { type: 'AuraDefinitionBundle', name: match[1] };
    }
    if (normalized.includes('/objects/') && normalized.includes('/fields/')) {
        const objMatch = normalized.match(/\/objects\/([^/]+)\//);
        const fieldMatch = normalized.match(/\/fields\/([^/.]+)\.field/);
        if (objMatch && fieldMatch) {
            return { type: 'CustomField', name: `${objMatch[1]}.${fieldMatch[1]}` };
        }
    }
    if (normalized.includes('/objects/')) {
        const match = normalized.match(/\/objects\/([^/.]+)\.object/);
        if (match) return { type: 'CustomObject', name: match[1] };
    }
    if (normalized.includes('/layouts/')) {
        const match = normalized.match(/\/layouts\/([^/.]+)\.layout/);
        if (match) return { type: 'Layout', name: match[1] };
    }
    if (normalized.includes('/flows/')) {
        const match = normalized.match(/\/flows\/([^/.]+)\.flow/);
        if (match) return { type: 'Flow', name: match[1] };
    }
    if (normalized.includes('/permissionsets/')) {
        const match = normalized.match(/\/permissionsets\/([^/.]+)\.permissionset/);
        if (match) return { type: 'PermissionSet', name: match[1] };
    }
    if (normalized.includes('/permissionsetgroups/')) {
        const match = normalized.match(/\/permissionsetgroups\/([^/.]+)\.permissionsetgroup/);
        if (match) return { type: 'PermissionSetGroup', name: match[1] };
    }
    if (normalized.includes('/profiles/')) {
        const match = normalized.match(/\/profiles\/([^/.]+)\.profile/);
        if (match) return { type: 'Profile', name: match[1] };
    }
    if (normalized.includes('/customMetadata/')) {
        const match = normalized.match(/\/customMetadata\/([^/.]+)\.md/);
        if (match) return { type: 'CustomMetadata', name: match[1] };
    }
    if (normalized.includes('/flexipages/')) {
        const match = normalized.match(/\/flexipages\/([^/.]+)\.flexipage/);
        if (match) return { type: 'FlexiPage', name: match[1] };
    }

    return null;
}

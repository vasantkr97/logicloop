
export interface NodeData {
    label: string;
    type: NodeType;
    parameters: Record<string, any>;
    credentials?: string;
}

export type NodeType =
| 'trigger'
| 'email'
| 'telegram'
| 'gemini'
| 'http'
| 'schedule'
| 'webhook'

export interface NodeDefinition {
    type: NodeType;
    name: string;
    category: 'trigger' | 'action' | 'logic';
    icon: string;
    color: string;
    description: string;
    parameters: NodeParameter[];
    credentials?: string[]
}


export interface NodeParameter {
    name: string;
    displayName: string;
    type: 'string' | 'number' | 'boolean' | 'select' | 'credentials';
    required?: boolean;
    default?: any;
    options?: Array<{ label: string; value: any }>;
    placeholder?: string;
    description?: string;
}
export interface message {
    text: string;
    owner: string;
}

export interface chat {
    name: string; // Should be unique
    messages: message[];
}
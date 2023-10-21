export interface message {
    content: string;
    role: string;
}

export interface chat {
    messages: message[];
}
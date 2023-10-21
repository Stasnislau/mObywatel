export interface message {
    text: string;
    link: string[];
    images: string;
}

export interface chat {
    name: string; // Should be unique
    messages: message[];
}
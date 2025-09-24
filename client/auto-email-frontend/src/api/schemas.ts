export const Categories = {
    PRODUTIVA: "produtiva",
    IMPRODUTIVA: "improdutiva",
} as const;

export type TCategories = typeof Categories[keyof typeof Categories];

export type SendEmailResponse = {
    category?: TCategories;
    answer: string;
    message: string;
}

export type NewUserResponse = {
    message: string;
}

export type HistoryResponse = {
    id: number;
    user_id: number;
    type: "plain" | "pdf" | "txt";
    date: string;
    category: string;
    answer?: string;
    content: string;
}

export class LabelConstants {

    public static readonly pages: Page[] = [
        {
            label: "Home",
            path: "/home",
        },
        {
            label: "About",
            path: "/about",
        }
    ];
}

export interface Page {
    label: string;
    path: string;
}
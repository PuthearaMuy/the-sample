export class LabelConstants {
    public static readonly APP_NAME: string = "The sample";


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
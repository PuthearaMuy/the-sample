export class ApplicationConstants {
    public static readonly SESSION_ID = "sid";
    public static readonly LAST_PAGE = "last_page";
    public static readonly DATE_FORMAT = "YYYY-MM-DD";

    public static setLastPage(lastPage: string) {
        sessionStorage.setItem(ApplicationConstants.LAST_PAGE, lastPage);
    }

    public static getLastPage(defaultPage: string) {
        return sessionStorage.getItem(ApplicationConstants.LAST_PAGE) || defaultPage;
    }
}
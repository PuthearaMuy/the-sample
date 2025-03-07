export function formatDate(timeStamp: number) {
    const date = new Date(timeStamp);
    return date.toLocaleDateString("en-US")
}

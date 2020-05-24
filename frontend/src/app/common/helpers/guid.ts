// is a similar RFC4122 version 4

export function generateUUID(): string {
    let d: number = Date.now();
    let d2: number = (performance && performance.now && (performance.now() * 1000)) || 0;

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: any) => {
        let r: number = Math.random() * 16; // random number between 0 and 16
        if (d > 0) { // Use timestamp until depleteds
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else { // Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

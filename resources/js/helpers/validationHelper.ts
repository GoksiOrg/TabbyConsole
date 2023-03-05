export default function validateInput(
    input: HTMLInputElement,
    rule: (value: string) => boolean
): boolean {
    const value = input.value;
    if (value === undefined || !rule(value)) {
        input.classList.add("is-invalid");
        return false;
    }
    return true;
}

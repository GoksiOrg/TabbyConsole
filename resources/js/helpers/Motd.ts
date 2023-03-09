// noinspection JSNonASCIINames

import { createElement, CSSProperties, ReactElement, ReactNode } from "react";

const colorCodeRegex = /(§[0-9a-fA-FklmnorKLMNOR])/g;
/*TODO: &k*/
interface CssMap {
    [key: string]: CSSProperties;
}
const styleCodes: CssMap = {
    "§l": { fontWeight: "bold" },
    "§m": { textDecoration: "line-through" },
    "§n": { textDecoration: "underline" },
    "§o": { fontStyle: "italic" },
};

const colorCodes = {
    "§0": "#000000",
    "§1": "#0000AA",
    "§2": "#00AA00",
    "§3": "#00AAAA",
    "§4": "#AA0000",
    "§5": "#AA00AA",
    "§6": "#FFAA00",
    "§7": "#AAAAAA",
    "§8": "#555555",
    "§9": "#5555FF",
    "§a": "#55FF55",
    "§b": "#55FFFF",
    "§c": "#FF5555",
    "§d": "#FF55FF",
    "§e": "#FFFF55",
    "§f": "#FFFFFF",
};

function parseMotd(motd: string): ReactElement {
    const splittedText = motd.split(colorCodeRegex);
    let colorHex = "";
    let fontStyle: CSSProperties = null;
    let resultHtml: ReactNode[] = [];
    splittedText.forEach((item, index) => {
        const lowerCase = item.toLowerCase();
        if (Object.hasOwn(colorCodes, lowerCase)) {
            colorHex = colorCodes[lowerCase];
        } else if (Object.hasOwn(styleCodes, lowerCase)) {
            const currentStyle = styleCodes[lowerCase];
            if (
                fontStyle?.textDecoration !== undefined &&
                currentStyle.textDecoration !== undefined
            ) {
                fontStyle.textDecoration = "line-through underline"; // I hate this
            } else fontStyle = { ...fontStyle, ...styleCodes[lowerCase] };
        } else if (lowerCase === "§r") {
            colorHex = "";
            fontStyle = null;
        } else {
            let resultColor: CSSProperties = null;
            if (colorHex !== "") resultColor = { color: colorHex };
            if (item !== "") {
                const textContent = formatTextToHtml(item);
                if (resultColor !== null || fontStyle !== null) {
                    resultHtml.push(
                        createElement(
                            "span",
                            {
                                key: index,
                                style: { ...resultColor, ...fontStyle },
                            },
                            textContent
                        )
                    );
                } else resultHtml.push(textContent);
            }
        }
    });
    return createElement("div", [], resultHtml);
}

export default function Motd(props: { motd: string }) {
    return parseMotd(props.motd);
}

const formatTextToHtml = (text: string): string => {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/\n/g, "<br/>");
};

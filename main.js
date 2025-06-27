const queens = [];
const trackRecord = {};
const challengeHistory = [];
const immuneHistory = {};
let immunityEnabled = false;
let immuneQueen = null;
let doubleWinCount = 0;
let episodeCount = 1;
let usedChallenges = new Set();
let doubleShantayUsed = false;
let premiereFormat = "REGULAR";
let eliminationOrder = [];
let missCongeniality = null;
let finaleMode = 'top4';
let isFinale = false;
let duel1A, duel1B, duel2A, duel2B, duel1Winner, duel2Winner;
let seasonFormat = "regular"; // padrão
const lipstickHistory = [];

function setSeasonFormat(format) {
    seasonFormat = format;

    document.getElementById("btn-regular").classList.remove("selected");
    document.getElementById("btn-allstars").classList.remove("selected");

    if (format === "regular") {
        document.getElementById("btn-regular").classList.add("selected");
    } else {
        document.getElementById("btn-allstars").classList.add("selected");
    }

    console.log("Season format set to:", seasonFormat);
}

// Todas as queens já salvas no simulador

const allPresetQueens = {
    1: [
        {
            name: "Bebe Zahara Benet",
            act: 10, imp: 9, com: 8, run: 12, dan: 8, lip: 12, song: 9, cha: 14, uni: 13, ner: 10, tal: 13, bra: 10, wit: 8, cre: 11, ver: 10, fash: 12
        },
        {
            name: "Nina Flowers",
            act: 9, imp: 10, com: 6, run: 14, dan: 10, lip: 13, song: 8, cha: 13, uni: 14, ner: 10, tal: 12, bra: 9, wit: 10, cre: 12, ver: 10, fash: 14
        },
        {
            name: "Rebecca Glasscock",
            act: 6, imp: 6, com: 5, run: 10, dan: 7, lip: 7, song: 7, cha: 7, uni: 7, ner: 7, tal: 7, bra: 6, wit: 6, cre: 7, ver: 8, fash: 9
        },
        {
            name: "Shannel",
            act: 8, imp: 8, com: 6, run: 12, dan: 9, lip: 10, song: 8, cha: 10, uni: 12, ner: 8, tal: 10, bra: 8, wit: 8, cre: 10, ver: 9, fash: 12
        },
        {
            name: "Ongina",
            act: 10, imp: 12, com: 9, run: 12, dan: 10, lip: 11, song: 9, cha: 13, uni: 13, ner: 9, tal: 12, bra: 11, wit: 11, cre: 12, ver: 11, fash: 13
        },
        {
            name: "Jade",
            act: 6, imp: 8, com: 5, run: 9, dan: 8, lip: 9, song: 8, cha: 8, uni: 8, ner: 7, tal: 8, bra: 6, wit: 7, cre: 8, ver: 8, fash: 9
        },
        {
            name: "Akashia",
            act: 4, imp: 6, com: 3, run: 9, dan: 8, lip: 8, song: 6, cha: 7, uni: 8, ner: 7, tal: 6, bra: 7, wit: 4, cre: 6, ver: 7, fash: 8
        },
        {
            name: "Tammie Brown",
            act: 7, imp: 8, com: 7, run: 9, dan: 6, lip: 5, song: 7, cha: 8, uni: 12, ner: 8, tal: 8, bra: 6, wit: 9, cre: 10, ver: 8, fash: 10
        },
        {
            name: "Victoria ‘Porkchop’ Parker",
            act: 4, imp: 4, com: 4, run: 9, dan: 7, lip: 8, song: 6, cha: 9, uni: 8, ner: 8, tal: 8, bra: 6, wit: 6, cre: 7, ver: 7, fash: 7
        }
    ],
    2: [
        {
            name: "Tyra Sanchez",
            act: 9, imp: 10, com: 4, run: 14, dan: 9, lip: 12, song: 9, cha: 12, uni: 10, ner: 9, tal: 12, bra: 9, wit: 6, cre: 10, ver: 10, fash: 12
        },
        {
            name: "Raven",
            act: 10, imp: 12, com: 8, run: 14, dan: 9, lip: 14, song: 9, cha: 14, uni: 10, ner: 12, tal: 14, bra: 10, wit: 9, cre: 10, ver: 12, fash: 12
        },
        {
            name: "Jujubee",
            act: 12, imp: 10, com: 12, run: 12, dan: 9, lip: 14, song: 9, cha: 14, uni: 10, ner: 10, tal: 12, bra: 10, wit: 14, cre: 10, ver: 12, fash: 12
        },
        {
            name: "Tatianna",
            act: 9, imp: 8, com: 6, run: 12, dan: 10, lip: 14, song: 8, cha: 12, uni: 10, ner: 10, tal: 9, bra: 9, wit: 8, cre: 9, ver: 10, fash: 12
        },
        {
            name: "Pandora Boxx",
            act: 9, imp: 9, com: 14, run: 10, dan: 8, lip: 9, song: 9, cha: 12, uni: 10, ner: 9, tal: 10, bra: 9, wit: 14, cre: 12, ver: 10, fash: 10
        },
        {
            name: "Jessica Wild",
            act: 10, imp: 9, com: 8, run: 10, dan: 10, lip: 10, song: 9, cha: 12, uni: 10, ner: 10, tal: 10, bra: 9, wit: 8, cre: 9, ver: 10, fash: 10
        },
        {
            name: "Sahara Davenport",
            act: 9, imp: 8, com: 6, run: 10, dan: 14, lip: 9, song: 8, cha: 10, uni: 9, ner: 9, tal: 10, bra: 9, wit: 6, cre: 8, ver: 9, fash: 10
        },
        {
            name: "Mystique Summers Madison",
            act: 3, imp: 6, com: 4, run: 9, dan: 9, lip: 9, song: 6, cha: 7, uni: 8, ner: 9, tal: 7, bra: 8, wit: 4, cre: 6, ver: 8, fash: 9
        },
        {
            name: "Morgan McMichaels",
            act: 9, imp: 8, com: 6, run: 10, dan: 12, lip: 10, song: 8, cha: 10, uni: 10, ner: 10, tal: 10, bra: 9, wit: 8, cre: 9, ver: 10, fash: 10
        },
        {
            name: "Sonique",
            act: 8, imp: 8, com: 4, run: 10, dan: 12, lip: 9, song: 8, cha: 9, uni: 10, ner: 10, tal: 9, bra: 9, wit: 6, cre: 8, ver: 9, fash: 10
        },
        {
            name: "Nicole Paige Brooks",
            act: 3, imp: 4, com: 3, run: 9, dan: 8, lip: 8, song: 6, cha: 7, uni: 8, ner: 7, tal: 6, bra: 6, wit: 6, cre: 6, ver: 8, fash: 8
        },
        {
            name: "Shangela",
            act: 6, imp: 6, com: 6, run: 9, dan: 8, lip: 9, song: 8, cha: 10, uni: 5, ner: 10, tal: 9, bra: 9, wit: 9, cre: 9, ver: 10, fash: 1
        }
    ],
    3: [
        {
            name: "Raja",
            act: 12, imp: 10, com: 9, run: 15, dan: 10, lip: 12, song: 10,
            cha: 14, uni: 14, ner: 12, tal: 14, bra: 12, wit: 10, cre: 14, ver: 12, fash: 14
        },
        {
            name: "Manila Luzon",
            act: 10, imp: 12, com: 12, run: 14, dan: 10, lip: 12, song: 10,
            cha: 14, uni: 14, ner: 10, tal: 14, bra: 12, wit: 12, cre: 14, ver: 12, fash: 14
        },
        {
            name: "Alexis Mateo",
            act: 10, imp: 10, com: 9, run: 12, dan: 10, lip: 12, song: 9,
            cha: 12, uni: 12, ner: 12, tal: 12, bra: 12, wit: 9, cre: 10, ver: 12, fash: 12
        },
        {
            name: "Yara Sofia",
            act: 9, imp: 10, com: 10, run: 14, dan: 12, lip: 12, song: 9,
            cha: 12, uni: 14, ner: 10, tal: 12, bra: 10, wit: 10, cre: 12, ver: 12, fash: 14
        },
        {
            name: "Carmen Carrera",
            act: 8, imp: 9, com: 8, run: 14, dan: 10, lip: 10, song: 8,
            cha: 10, uni: 10, ner: 9, tal: 9, bra: 9, wit: 8, cre: 9, ver: 10, fash: 12
        },
        {
            name: "Shangela",
            act: 9, imp: 10, com: 9, run: 12, dan: 10, lip: 10, song: 9,
            cha: 12, uni: 12, ner: 10, tal: 10, bra: 10, wit: 10, cre: 10, ver: 10, fash: 12
        },
        {
            name: "Delta Work",
            act: 9, imp: 8, com: 9, run: 10, dan: 9, lip: 9, song: 9,
            cha: 10, uni: 10, ner: 9, tal: 9, bra: 9, wit: 9, cre: 9, ver: 9, fash: 10
        },
        {
            name: "Stacy Layne Matthews",
            act: 9, imp: 8, com: 8, run: 9, dan: 9, lip: 10, song: 8,
            cha: 10, uni: 9, ner: 9, tal: 9, bra: 9, wit: 8, cre: 9, ver: 9, fash: 9
        },
        {
            name: "Mariah",
            act: 9, imp: 8, com: 6, run: 12, dan: 9, lip: 9, song: 8,
            cha: 10, uni: 10, ner: 9, tal: 9, bra: 9, wit: 8, cre: 8, ver: 9, fash: 10
        },
        {
            name: "India Ferrah",
            act: 6, imp: 6, com: 4, run: 10, dan: 9, lip: 8, song: 8,
            cha: 8, uni: 9, ner: 9, tal: 8, bra: 8, wit: 6, cre: 8, ver: 8, fash: 9
        },
        {
            name: "Mimi Imfurst",
            act: 6, imp: 6, com: 8, run: 9, dan: 8, lip: 8, song: 8,
            cha: 9, uni: 9, ner: 8, tal: 8, bra: 8, wit: 8, cre: 9, ver: 8, fash: 9
        },
        {
            name: "Phoenix",
            act: 5, imp: 6, com: 5, run: 9, dan: 9, lip: 8, song: 6,
            cha: 8, uni: 8, ner: 8, tal: 8, bra: 8, wit: 6, cre: 8, ver: 7, fash: 9
        },
        {
            name: "Venus D-Lite",
            act: 3, imp: 4, com: 4, run: 9, dan: 8, lip: 8, song: 6,
            cha: 7, uni: 9, ner: 8, tal: 6, bra: 6, wit: 6, cre: 6, ver: 7, fash: 9
        }
    ],
    4: [
        {
            name: "Sharon Needles",
            act: 12, imp: 10, com: 12, run: 12, dan: 9, lip: 10, song: 10,
            cha: 12, uni: 14, ner: 12, tal: 14, bra: 12, wit: 12, cre: 14, ver: 12, fash: 12
        },
        {
            name: "Chad Michaels",
            act: 12, imp: 10, com: 10, run: 14, dan: 10, lip: 12, song: 10,
            cha: 14, uni: 12, ner: 14, tal: 14, bra: 12, wit: 10, cre: 12, ver: 14, fash: 14
        },
        {
            name: "Phi Phi O'Hara",
            act: 10, imp: 9, com: 8, run: 14, dan: 10, lip: 12, song: 9,
            cha: 12, uni: 12, ner: 14, tal: 12, bra: 10, wit: 9, cre: 10, ver: 12, fash: 12
        },
        {
            name: "Latrice Royale",
            act: 9, imp: 9, com: 12, run: 10, dan: 9, lip: 14, song: 9,
            cha: 14, uni: 10, ner: 12, tal: 12, bra: 10, wit: 14, cre: 10, ver: 10, fash: 12
        },
        {
            name: "DiDa Ritz",
            act: 9, imp: 8, com: 9, run: 10, dan: 10, lip: 14, song: 9,
            cha: 12, uni: 10, ner: 10, tal: 10, bra: 9, wit: 9, cre: 9, ver: 10, fash: 10
        },
        {
            name: "Willam",
            act: 10, imp: 9, com: 10, run: 12, dan: 10, lip: 10, song: 10,
            cha: 14, uni: 12, ner: 10, tal: 12, bra: 12, wit: 12, cre: 10, ver: 12, fash: 12
        },
        {
            name: "Jiggly Caliente",
            act: 8, imp: 6, com: 8, run: 9, dan: 10, lip: 9, song: 8,
            cha: 10, uni: 9, ner: 10, tal: 9, bra: 9, wit: 8, cre: 8, ver: 9, fash: 9
        },
        {
            name: "Milan",
            act: 9, imp: 9, com: 8, run: 10, dan: 12, lip: 10, song: 9,
            cha: 10, uni: 10, ner: 10, tal: 10, bra: 10, wit: 8, cre: 9, ver: 10, fash: 10
        },
        {
            name: "Madame LaQueer",
            act: 7, imp: 8, com: 6, run: 9, dan: 8, lip: 8, song: 8,
            cha: 8, uni: 9, ner: 9, tal: 8, bra: 8, wit: 6, cre: 8, ver: 9, fash: 9
        },
        {
            name: "The Princess",
            act: 5, imp: 6, com: 6, run: 9, dan: 9, lip: 8, song: 8,
            cha: 8, uni: 9, ner: 8, tal: 8, bra: 8, wit: 6, cre: 8, ver: 7, fash: 9
        },
        {
            name: "Kenya Michaels",
            act: 9, imp: 8, com: 6, run: 10, dan: 12, lip: 10, song: 8,
            cha: 10, uni: 10, ner: 10, tal: 9, bra: 9, wit: 8, cre: 8, ver: 9, fash: 10
        },
        {
            name: "Alisa Summers",
            act: 3, imp: 4, com: 3, run: 9, dan: 8, lip: 8, song: 6,
            cha: 7, uni: 8, ner: 9, tal: 6, bra: 6, wit: 6, cre: 6, ver: 8, fash: 8
        }
    ],
    5: [
        {
            name: "Jinkx Monsoon",
            act: 14, imp: 12, com: 14, run: 10, dan: 9, lip: 12, song: 12,
            cha: 14, uni: 14, ner: 12, tal: 15, bra: 12, wit: 15, cre: 14, ver: 14, fash: 12
        },
        {
            name: "Alaska",
            act: 10, imp: 12, com: 12, run: 12, dan: 10, lip: 12, song: 12,
            cha: 14, uni: 14, ner: 14, tal: 14, bra: 14, wit: 14, cre: 14, ver: 14, fash: 14
        },
        {
            name: "Roxxxy Andrews",
            act: 9, imp: 9, com: 8, run: 14, dan: 12, lip: 14, song: 9,
            cha: 12, uni: 12, ner: 10, tal: 12, bra: 12, wit: 9, cre: 10, ver: 12, fash: 12
        },
        {
            name: "Detox",
            act: 10, imp: 9, com: 10, run: 14, dan: 10, lip: 10, song: 10,
            cha: 12, uni: 14, ner: 10, tal: 12, bra: 12, wit: 10, cre: 12, ver: 12, fash: 14
        },
        {
            name: "Alyssa Edwards",
            act: 9, imp: 9, com: 8, run: 10, dan: 15, lip: 14, song: 9,
            cha: 12, uni: 12, ner: 12, tal: 12, bra: 10, wit: 9, cre: 10, ver: 12, fash: 12
        },
        {
            name: "Coco Montrese",
            act: 9, imp: 8, com: 8, run: 10, dan: 12, lip: 14, song: 9,
            cha: 10, uni: 10, ner: 10, tal: 10, bra: 10, wit: 9, cre: 9, ver: 10, fash: 10
        },
        {
            name: "Ivy Winters",
            act: 9, imp: 9, com: 8, run: 12, dan: 10, lip: 10, song: 9,
            cha: 10, uni: 12, ner: 9, tal: 10, bra: 10, wit: 9, cre: 12, ver: 10, fash: 12
        },
        {
            name: "Jade Jolie",
            act: 8, imp: 8, com: 8, run: 10, dan: 10, lip: 10, song: 8,
            cha: 9, uni: 10, ner: 9, tal: 9, bra: 9, wit: 8, cre: 9, ver: 9, fash: 10
        },
        {
            name: "Lineysha Sparx",
            act: 9, imp: 8, com: 6, run: 12, dan: 9, lip: 9, song: 8,
            cha: 10, uni: 10, ner: 9, tal: 9, bra: 9, wit: 8, cre: 9, ver: 9, fash: 10
        },
        {
            name: "Honey Mahogany",
            act: 5, imp: 6, com: 3, run: 9, dan: 8, lip: 8, song: 8,
            cha: 9, uni: 9, ner: 8, tal: 7, bra: 8, wit: 6, cre: 8, ver: 8, fash: 9
        },
        {
            name: "Vivienne Pinay",
            act: 5, imp: 6, com: 3, run: 10, dan: 8, lip: 9, song: 8,
            cha: 9, uni: 9, ner: 9, tal: 8, bra: 8, wit: 6, cre: 6, ver: 8, fash: 9
        },
        {
            name: "Monica Beverly Hillz",
            act: 8, imp: 8, com: 6, run: 9, dan: 9, lip: 9, song: 8,
            cha: 9, uni: 9, ner: 9, tal: 9, bra: 8, wit: 6, cre: 8, ver: 9, fash: 9
        },
        {
            name: "Serena ChaCha",
            act: 3, imp: 4, com: 3, run: 9, dan: 8, lip: 8, song: 6,
            cha: 7, uni: 9, ner: 8, tal: 6, bra: 8, wit: 6, cre: 6, ver: 8, fash: 9
        },
        {
            name: "Penny Tration",
            act: 3, imp: 4, com: 4, run: 8, dan: 6, lip: 5, song: 6,
            cha: 8, uni: 8, ner: 8, tal: 6, bra: 6, wit: 4, cre: 5, ver: 6, fash: 8
        }
    ],
    6: [
        {
            name: "Bianca Del Rio",
            act: 14, imp: 14, com: 15, run: 12, dan: 9, lip: 12, song: 10,
            cha: 15, uni: 12, ner: 14, tal: 15, bra: 14, wit: 15, cre: 12, ver: 14, fash: 14
        },
        {
            name: "Adore Delano",
            act: 10, imp: 12, com: 10, run: 10, dan: 10, lip: 14, song: 14,
            cha: 14, uni: 12, ner: 14, tal: 14, bra: 12, wit: 12, cre: 12, ver: 12, fash: 12
        },
        {
            name: "Courtney Act",
            act: 12, imp: 10, com: 10, run: 14, dan: 12, lip: 12, song: 14,
            cha: 14, uni: 14, ner: 10, tal: 14, bra: 12, wit: 10, cre: 12, ver: 14, fash: 14
        },
        {
            name: "Darienne Lake",
            act: 10, imp: 10, com: 12, run: 10, dan: 9, lip: 12, song: 9,
            cha: 12, uni: 10, ner: 12, tal: 10, bra: 10, wit: 12, cre: 10, ver: 10, fash: 10
        },
        {
            name: "BenDeLaCreme",
            act: 12, imp: 10, com: 14, run: 12, dan: 9, lip: 10, song: 10,
            cha: 14, uni: 12, ner: 10, tal: 12, bra: 12, wit: 14, cre: 12, ver: 12, fash: 12
        },
        {
            name: "Joslyn Fox",
            act: 9, imp: 9, com: 10, run: 10, dan: 10, lip: 10, song: 9,
            cha: 10, uni: 10, ner: 10, tal: 10, bra: 10, wit: 9, cre: 9, ver: 10, fash: 10
        },
        {
            name: "Laganja Estranja",
            act: 9, imp: 9, com: 8, run: 12, dan: 14, lip: 12, song: 9,
            cha: 10, uni: 12, ner: 9, tal: 10, bra: 10, wit: 9, cre: 9, ver: 10, fash: 12
        },
        {
            name: "Milk",
            act: 9, imp: 9, com: 9, run: 12, dan: 9, lip: 9, song: 9,
            cha: 10, uni: 14, ner: 10, tal: 10, bra: 10, wit: 9, cre: 12, ver: 10, fash: 12
        },
        {
            name: "Trinity K. Bonet",
            act: 9, imp: 8, com: 6, run: 12, dan: 14, lip: 15, song: 9,
            cha: 10, uni: 12, ner: 9, tal: 12, bra: 9, wit: 8, cre: 9, ver: 10, fash: 12
        },
        {
            name: "Gia Gunn",
            act: 8, imp: 8, com: 6, run: 10, dan: 10, lip: 9, song: 8,
            cha: 9, uni: 10, ner: 10, tal: 9, bra: 9, wit: 8, cre: 9, ver: 9, fash: 10
        },
        {
            name: "April Carrión",
            act: 9, imp: 8, com: 6, run: 12, dan: 10, lip: 9, song: 8,
            cha: 10, uni: 10, ner: 10, tal: 10, bra: 9, wit: 8, cre: 9, ver: 10, fash: 10
        },
        {
            name: "Vivacious",
            act: 5, imp: 6, com: 4, run: 9, dan: 8, lip: 7, song: 6,
            cha: 9, uni: 9, ner: 9, tal: 8, bra: 8, wit: 6, cre: 8, ver: 8, fash: 9
        },
        {
            name: "Kelly Mantle",
            act: 7, imp: 6, com: 8, run: 9, dan: 8, lip: 6, song: 8,
            cha: 9, uni: 9, ner: 9, tal: 8, bra: 8, wit: 8, cre: 9, ver: 9, fash: 9
        }
    ],
    7: [
        {
            name: "Violet Chachki",
            act: 9, imp: 9, com: 9, run: 15, dan: 10, lip: 10, song: 9,
            cha: 12, uni: 14, ner: 14, tal: 14, bra: 12, wit: 9, cre: 10, ver: 12, fash: 14
        },
        {
            name: "Ginger Minj",
            act: 14, imp: 12, com: 14, run: 10, dan: 9, lip: 12, song: 12,
            cha: 14, uni: 12, ner: 12, tal: 14, bra: 12, wit: 14, cre: 12, ver: 12, fash: 12
        },
        {
            name: "Pearl",
            act: 9, imp: 9, com: 9, run: 12, dan: 10, lip: 10, song: 9,
            cha: 10, uni: 12, ner: 10, tal: 10, bra: 10, wit: 9, cre: 9, ver: 10, fash: 12
        },
        {
            name: "Kennedy Davenport",
            act: 9, imp: 8, com: 8, run: 10, dan: 15, lip: 14, song: 9,
            cha: 10, uni: 10, ner: 10, tal: 12, bra: 10, wit: 9, cre: 9, ver: 10, fash: 10
        },
        {
            name: "Katya",
            act: 12, imp: 12, com: 12, run: 12, dan: 12, lip: 14, song: 12,
            cha: 14, uni: 14, ner: 12, tal: 14, bra: 12, wit: 14, cre: 12, ver: 14, fash: 14
        },
        {
            name: "Miss Fame",
            act: 9, imp: 8, com: 6, run: 14, dan: 9, lip: 9, song: 9,
            cha: 10, uni: 12, ner: 9, tal: 9, bra: 10, wit: 8, cre: 9, ver: 10, fash: 12
        },
        {
            name: "Trixie Mattel",
            act: 9, imp: 10, com: 12, run: 12, dan: 9, lip: 10, song: 10,
            cha: 12, uni: 12, ner: 12, tal: 12, bra: 12, wit: 14, cre: 12, ver: 12, fash: 12
        },
        {
            name: "Max",
            act: 10, imp: 9, com: 9, run: 12, dan: 9, lip: 9, song: 9,
            cha: 10, uni: 12, ner: 9, tal: 10, bra: 10, wit: 9, cre: 10, ver: 10, fash: 12
        },
        {
            name: "Jaidynn Diore Fierce",
            act: 9, imp: 9, com: 9, run: 10, dan: 10, lip: 10, song: 9,
            cha: 10, uni: 10, ner: 10, tal: 10, bra: 9, wit: 9, cre: 9, ver: 10, fash: 10
        },
        {
            name: "Kandy Ho",
            act: 5, imp: 6, com: 6, run: 9, dan: 9, lip: 9, song: 8,
            cha: 7, uni: 9, ner: 9, tal: 8, bra: 8, wit: 6, cre: 8, ver: 8, fash: 9
        },
        {
            name: "Mrs. Kasha Davis",
            act: 9, imp: 8, com: 9, run: 10, dan: 9, lip: 9, song: 8,
            cha: 10, uni: 9, ner: 9, tal: 9, bra: 9, wit: 9, cre: 9, ver: 9, fash: 10
        },
        {
            name: "Jasmine Masters",
            act: 8, imp: 5, com: 8, run: 10, dan: 10, lip: 9, song: 8,
            cha: 10, uni: 10, ner: 9, tal: 9, bra: 9, wit: 6, cre: 8, ver: 9, fash: 10
        },
        {
            name: "Tempest DuJour",
            act: 6, imp: 6, com: 6, run: 9, dan: 8, lip: 8, song: 8,
            cha: 8, uni: 9, ner: 9, tal: 8, bra: 8, wit: 8, cre: 8, ver: 8, fash: 9
        }
    ],
    8: [
        {
            name: "Bob the Drag Queen",
            act: 14, imp: 14, com: 15, run: 12, dan: 10, lip: 12, song: 12,
            cha: 15, uni: 14, ner: 14, tal: 15, bra: 14, wit: 15, cre: 14, ver: 14, fash: 14
        },
        {
            name: "Kim Chi",
            act: 9, imp: 9, com: 9, run: 15, dan: 8, lip: 8, song: 8,
            cha: 12, uni: 15, ner: 12, tal: 12, bra: 14, wit: 10, cre: 14, ver: 12, fash: 14
        },
        {
            name: "Naomi Smalls",
            act: 9, imp: 9, com: 9, run: 15, dan: 12, lip: 10, song: 9,
            cha: 14, uni: 14, ner: 12, tal: 12, bra: 12, wit: 9, cre: 10, ver: 12, fash: 14
        },
        {
            name: "Chi Chi DeVayne",
            act: 10, imp: 9, com: 9, run: 10, dan: 15, lip: 14, song: 10,
            cha: 12, uni: 12, ner: 12, tal: 12, bra: 10, wit: 9, cre: 10, ver: 12, fash: 12
        },
        {
            name: "Derrick Barry",
            act: 8, imp: 6, com: 6, run: 12, dan: 9, lip: 10, song: 8,
            cha: 10, uni: 10, ner: 10, tal: 9, bra: 9, wit: 8, cre: 8, ver: 9, fash: 10
        },
        {
            name: "Thorgy Thor",
            act: 10, imp: 10, com: 12, run: 12, dan: 10, lip: 10, song: 10,
            cha: 12, uni: 12, ner: 12, tal: 12, bra: 12, wit: 12, cre: 12, ver: 12, fash: 12
        },
        {
            name: "Robbie Turner",
            act: 9, imp: 8, com: 9, run: 10, dan: 9, lip: 9, song: 9,
            cha: 10, uni: 10, ner: 9, tal: 10, bra: 10, wit: 9, cre: 9, ver: 10, fash: 10
        },
        {
            name: "Acid Betty",
            act: 10, imp: 9, com: 9, run: 14, dan: 10, lip: 10, song: 9,
            cha: 10, uni: 14, ner: 10, tal: 12, bra: 12, wit: 10, cre: 12, ver: 12, fash: 12
        },
        {
            name: "Naysha Lopez",
            act: 8, imp: 6, com: 6, run: 14, dan: 9, lip: 9, song: 8,
            cha: 9, uni: 12, ner: 9, tal: 9, bra: 9, wit: 8, cre: 8, ver: 9, fash: 12
        },
        {
            name: "Dax ExclamationPoint",
            act: 5, imp: 6, com: 3, run: 12, dan: 9, lip: 9, song: 8,
            cha: 8, uni: 10, ner: 9, tal: 9, bra: 8, wit: 6, cre: 8, ver: 9, fash: 10
        },
        {
            name: "Laila McQueen",
            act: 4, imp: 6, com: 4, run: 9, dan: 8, lip: 8, song: 6,
            cha: 7, uni: 9, ner: 8, tal: 8, bra: 8, wit: 6, cre: 8, ver: 7, fash: 9
        },
        {
            name: "Cynthia Lee Fontaine",
            act: 9, imp: 9, com: 10, run: 10, dan: 9, lip: 10, song: 9,
            cha: 12, uni: 12, ner: 10, tal: 10, bra: 10, wit: 10, cre: 10, ver: 10, fash: 12
        }
    ],
    9: [
        {
            name: "Sasha Velour",
            act: 12, imp: 10, com: 9, run: 14, dan: 9, lip: 14, song: 10,
            cha: 14, uni: 14, ner: 12, tal: 14, bra: 12, wit: 12, cre: 14, ver: 12, fash: 14
        },
        {
            name: "Peppermint",
            act: 10, imp: 9, com: 10, run: 12, dan: 10, lip: 15, song: 10,
            cha: 12, uni: 12, ner: 12, tal: 12, bra: 10, wit: 10, cre: 10, ver: 12, fash: 12
        },
        {
            name: "Trinity Taylor",
            act: 10, imp: 10, com: 9, run: 14, dan: 12, lip: 12, song: 10,
            cha: 12, uni: 14, ner: 14, tal: 14, bra: 12, wit: 9, cre: 10, ver: 14, fash: 14
        },
        {
            name: "Shea Couleé",
            act: 14, imp: 12, com: 12, run: 14, dan: 14, lip: 14, song: 12,
            cha: 14, uni: 14, ner: 14, tal: 15, bra: 14, wit: 12, cre: 14, ver: 14, fash: 14
        },
        {
            name: "Alexis Michelle",
            act: 9, imp: 9, com: 8, run: 12, dan: 9, lip: 9, song: 9,
            cha: 10, uni: 10, ner: 10, tal: 10, bra: 9, wit: 9, cre: 9, ver: 10, fash: 10
        },
        {
            name: "Nina Bo'nina Brown",
            act: 10, imp: 10, com: 8, run: 14, dan: 10, lip: 10, song: 9,
            cha: 10, uni: 12, ner: 9, tal: 10, bra: 9, wit: 8, cre: 12, ver: 10, fash: 12
        },
        {
            name: "Valentina",
            act: 9, imp: 10, com: 9, run: 14, dan: 9, lip: 6, song: 9,
            cha: 12, uni: 14, ner: 9, tal: 10, bra: 9, wit: 9, cre: 10, ver: 10, fash: 14
        },
        {
            name: "Aja",
            act: 9, imp: 9, com: 9, run: 12, dan: 12, lip: 10, song: 9,
            cha: 10, uni: 10, ner: 9, tal: 10, bra: 9, wit: 9, cre: 9, ver: 10, fash: 10
        },
        {
            name: "Farrah Moan",
            act: 8, imp: 8, com: 6, run: 14, dan: 8, lip: 9, song: 8,
            cha: 10, uni: 12, ner: 9, tal: 9, bra: 8, wit: 6, cre: 8, ver: 9, fash: 12
        },
        {
            name: "Eureka",
            act: 9, imp: 9, com: 10, run: 10, dan: 9, lip: 10, song: 9,
            cha: 12, uni: 10, ner: 10, tal: 10, bra: 9, wit: 10, cre: 9, ver: 10, fash: 10
        },
        {
            name: "Kimora Blac",
            act: 5, imp: 6, com: 3, run: 14, dan: 8, lip: 8, song: 6,
            cha: 9, uni: 10, ner: 8, tal: 8, bra: 8, wit: 3, cre: 8, ver: 8, fash: 10
        },
        {
            name: "Jaymes Mansfield",
            act: 5, imp: 6, com: 7, run: 9, dan: 8, lip: 5, song: 6,
            cha: 9, uni: 9, ner: 9, tal: 8, bra: 8, wit: 8, cre: 8, ver: 8, fash: 9
        }
    ],
    10: [
        {
            name: "Aquaria",
            act: 10, imp: 12, com: 9, run: 15, dan: 10, lip: 10, song: 10,
            cha: 14, uni: 14, ner: 12, tal: 14, bra: 12, wit: 10, cre: 12, ver: 14, fash: 14
        },
        {
            name: "Eureka",
            act: 10, imp: 9, com: 10, run: 12, dan: 10, lip: 12, song: 10,
            cha: 12, uni: 12, ner: 12, tal: 12, bra: 12, wit: 10, cre: 10, ver: 12, fash: 12
        },
        {
            name: "Kameron Michaels",
            act: 9, imp: 8, com: 6, run: 14, dan: 14, lip: 15, song: 9,
            cha: 10, uni: 12, ner: 10, tal: 10, bra: 10, wit: 8, cre: 9, ver: 10, fash: 12
        },
        {
            name: "Asia O’Hara",
            act: 10, imp: 10, com: 9, run: 14, dan: 10, lip: 9, song: 10,
            cha: 12, uni: 14, ner: 12, tal: 12, bra: 10, wit: 10, cre: 12, ver: 12, fash: 14
        },
        {
            name: "Miz Cracker",
            act: 10, imp: 10, com: 14, run: 12, dan: 9, lip: 9, song: 10,
            cha: 12, uni: 12, ner: 12, tal: 12, bra: 12, wit: 14, cre: 12, ver: 12, fash: 12
        },
        {
            name: "Monét X Change",
            act: 10, imp: 9, com: 12, run: 12, dan: 10, lip: 14, song: 10,
            cha: 12, uni: 12, ner: 12, tal: 12, bra: 12, wit: 12, cre: 10, ver: 12, fash: 12
        },
        {
            name: "The Vixen",
            act: 9, imp: 8, com: 9, run: 10, dan: 12, lip: 10, song: 9,
            cha: 10, uni: 10, ner: 12, tal: 10, bra: 10, wit: 9, cre: 9, ver: 10, fash: 10
        },
        {
            name: "Blair St. Clair",
            act: 9, imp: 9, com: 9, run: 12, dan: 9, lip: 9, song: 10,
            cha: 10, uni: 12, ner: 9, tal: 10, bra: 9, wit: 9, cre: 9, ver: 10, fash: 12
        },
        {
            name: "Mayhem Miller",
            act: 8, imp: 8, com: 8, run: 12, dan: 9, lip: 9, song: 8,
            cha: 10, uni: 10, ner: 9, tal: 9, bra: 9, wit: 8, cre: 9, ver: 9, fash: 10
        },
        {
            name: "Dusty Ray Bottoms",
            act: 8, imp: 6, com: 8, run: 10, dan: 9, lip: 8, song: 8,
            cha: 9, uni: 10, ner: 9, tal: 9, bra: 8, wit: 8, cre: 9, ver: 9, fash: 10
        },
        {
            name: "Yuhua Hamasaki",
            act: 5, imp: 6, com: 8, run: 9, dan: 9, lip: 8, song: 6,
            cha: 8, uni: 9, ner: 8, tal: 8, bra: 8, wit: 8, cre: 8, ver: 8, fash: 9
        },
        {
            name: "Kalorie Karbdashian-Williams",
            act: 5, imp: 3, com: 6, run: 9, dan: 8, lip: 9, song: 6,
            cha: 9, uni: 9, ner: 8, tal: 7, bra: 8, wit: 6, cre: 6, ver: 8, fash: 9
        },
        {
            name: "Vanessa Vanjie Mateo",
            act: 6, imp: 4, com: 6, run: 10, dan: 9, lip: 10, song: 8,
            cha: 10, uni: 10, ner: 9, tal: 9, bra: 9, wit: 9, cre: 9, ver: 9, fash: 10
        }
    ],
};

function simulateAllStarsEpisode() {
    console.log("✅ simulateAllStarsEpisode foi chamada");

    try {
        const remaining = queens.filter(q => !q.eliminated);

        // ✅ Garante trackRecord e lipsync inicializados
        for (const q of remaining) {
            if (!trackRecord[q.name]) trackRecord[q.name] = [];
            if (q.lipsync === undefined) q.lipsync = 5;
        }

        const currentImmune = immuneQueen;
        immuneQueen = null;

        if (currentImmune) {
            const immuneObj = queens.find(q => q.name === currentImmune && !q.eliminated);
            if (immuneObj) {
                if (!immuneHistory[immuneObj.name]) immuneHistory[immuneObj.name] = [];
                immuneHistory[immuneObj.name].push(episodeCount);
            }
        }

        let availableChallenges = challenges.filter(ch => !usedChallenges.has(ch.name));
        if (availableChallenges.length === 0) {
            usedChallenges.clear();
            availableChallenges = [...challenges];
        }

        const challenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
        const isBall = challenge.name.toLowerCase().includes("ball");
        usedChallenges.add(challenge.name);
        challengeHistory.push(challenge.name);

        let runway;
        let runwayList = [];

        if (isBall) {
            while (runwayList.length < 3) {
                const candidate = runwayThemes[Math.floor(Math.random() * runwayThemes.length)];
                if (!runwayList.includes(candidate)) runwayList.push(candidate);
            }
            runway = runwayList.join(" / ");
        } else {
            runway = runwayThemes[Math.floor(Math.random() * runwayThemes.length)];
        }

        const scores = remaining.map(q => {
            const challengeScore = getChallengeScore(q, challenge.stats);
            const runwayScore = getRunwayScore(q, runway);
            const runwayWeight = isBall ? 0.5 : 0.3;
            const performanceWeight = 1 - runwayWeight;
            const performance = performanceWeight * challengeScore + runwayWeight * runwayScore;
            const riggory = 1 + (Math.random() * 0.4 - 0.2);
            q.score = performance * riggory;
            return q;
        });

        if (currentImmune) {
            const immune = scores.find(q => q.name === currentImmune);
            if (immune) {
                immune.score = -999;
                trackRecord[immune.name].push("SAFE");
            }
        }

        scores.sort((a, b) => b.score - a.score);
        let top2 = [];
        const topCandidates = scores.filter(q => q.score !== -999);

        for (const q of topCandidates) {
            const rec = trackRecord[q.name] || [];
            const tops = rec.filter(r => r === "TOP2" || r === "WIN").length;

            if (tops < 4) {
                top2.push(q);
            } else if (tops === 4) {
                const othersAvg = topCandidates
                    .filter(x => x.name !== q.name)
                    .slice(0, 3)
                    .reduce((acc, x) => acc + x.score, 0) / 3;

                if (q.score > othersAvg + 1.5) {
                    top2.push(q);
                }
            }
            if (top2.length === 2) break;
        }

        // ✅ Proteção: top2 incompleto = encerra episódio
        if (top2.length < 2) {
            console.error("❌ Top 2 não foi formado corretamente:", top2);
            alert("Erro: não foi possível formar o Top 2. Verifique o elenco ou os dados das queens.");
            return;
        }

        top2.forEach(q => trackRecord[q.name].push("TOP2"));
        const alreadyPlaced = new Set(top2.map(q => q.name));

        let high = [], bottom = [], safe = [];

        const preFinale = (
            (remaining.length === 5 && finaleMode === "top4") ||
            (remaining.length === 4 && finaleMode === "top3")
        );

        if (preFinale) {
            const rest = scores.filter(q => !alreadyPlaced.has(q.name) && q.score !== -999);
            bottom = rest;
            bottom.forEach(q => {
                alreadyPlaced.add(q.name);
                trackRecord[q.name].push("BTM");
            });
        } else {
            high = scores.filter(q => !alreadyPlaced.has(q.name) && q.score !== -999).slice(0, 1);
            high.forEach(q => {
                alreadyPlaced.add(q.name);
                trackRecord[q.name].push("HIGH");
            });

            bottom = scores.filter(q => !alreadyPlaced.has(q.name) && q.score !== -999).slice(-3);
            bottom.forEach(q => {
                alreadyPlaced.add(q.name);
                trackRecord[q.name].push("BTM");
            });

            safe = scores.filter(q =>
                !alreadyPlaced.has(q.name) && q.name !== currentImmune && q.score !== -999);
            safe.forEach(q => {
                alreadyPlaced.add(q.name);
                trackRecord[q.name].push("SAFE");
            });
        }

        // ✅ Proteção: simula lipsync com segurança
        const lipsyncWinner = simulateLipsync(top2[0], top2[1]) || top2[0];
        const lipsyncLoser = top2.find(q => q !== lipsyncWinner) || top2[1];

        trackRecord[lipsyncWinner.name].pop();
        trackRecord[lipsyncWinner.name].push("WIN");

        let elimByWinner = null;
        let elimByLoser = null;

        if (episodeCount >= 1) {
            const eliminationCandidates = bottom.filter(q => q.name !== lipsyncWinner.name);
            if (eliminationCandidates.length > 0) {
                elimByWinner = chooseElimination(lipsyncWinner, eliminationCandidates);
                elimByLoser = chooseElimination(lipsyncLoser, eliminationCandidates);
            }

            // ✅ Proteção: só elimina se houve escolha válida
            if (elimByWinner) {
                elimByWinner.eliminated = true;
                elimByWinner.eliminatedEpisode = episodeCount;
                trackRecord[elimByWinner.name][episodeCount - 1] = "ELIM";
                eliminationOrder.push(elimByWinner.name);

                reduceRelationship(lipsyncWinner.name, elimByWinner.name, 10);
                if (elimByLoser) reduceRelationship(lipsyncLoser.name, elimByLoser.name, 5);
            }
        }

        if (immunityEnabled && episodeCount < Math.floor(queens.length / 2)) {
            immuneQueen = lipsyncWinner.name;
            if (!immuneHistory[immuneQueen]) immuneHistory[immuneQueen] = [];
            immuneHistory[immuneQueen].push(episodeCount + 1);
        }

        lipstickHistory.push({
            episode: episodeCount,
            top2A: lipsyncWinner.name,
            elimA: elimByWinner?.name || "None",
            top2B: lipsyncLoser.name,
            elimB: elimByLoser?.name || "None"
        });

        // === RELACIONAMENTOS ===
        const currentCast = queens.filter(q => !q.eliminated);
        for (let i = 0; i < safe.length; i++) {
            for (let j = i + 1; j < safe.length; j++) {
                updateRelationship(safe[i], safe[j], 1);
            }
        }
        for (const t of top2) {
            for (const h of high) {
                updateRelationship(t, h, 1);
            }
        }
        if (bottom.length === 2) updateRelationship(bottom[0], bottom[1], -3);
        if (elimByWinner && elimByLoser) {
            updateRelationship(elimByWinner, lipsyncWinner, -5);
            updateRelationship(elimByWinner, lipsyncLoser, -2);
        }
        ensureRelationships(currentCast);

        // === DRAMA E NARRAÇÃO ===
        const drama = generateDramaNarrative(currentCast);
        const dramaHTML = drama.length
            ? `<p><strong>🎭 Drama:</strong><br>${drama.join("<br>")}</p>`
            : "";

        const narrationHTML = generateEpisodeNarration({
            top2,
            highs: high,
            lows: [],
            bottom,
            lipsyncWinner,
            elim: elimByWinner,
            elimByLoser,
            lipsyncLoser,
            isAllStars: true
        });

        const officialResultsHTML = `
            <div class="official-results" style="display:none;">
                <p><strong>👑 Top 2:</strong> ${top2.map(q => q.name).join(" & ")}</p>
                <p><strong>⭐ High:</strong> ${high.map(q => q.name).join(", ") || "None"}</p>
                <p><strong>✅ Safe:</strong> ${safe.map(q => q.name).join(", ") || "None"}</p>
                <p><strong>💋 Bottom:</strong> ${bottom.map(q => q.name).join(" & ")}</p>
                <p><strong>💄 Lipsync Winner:</strong> <b>${lipsyncWinner.name}</b></p>
                ${elimByWinner ? `<p><b>${lipsyncWinner.name}</b> eliminou: <b style="color:red">${elimByWinner.name}</b></p>` : ""}
                ${elimByLoser ? `<p>${lipsyncLoser.name} teria escolhido: ${elimByLoser.name}</p>` : ""}
                <p>💔 <strong>Eliminated:</strong> <span style="color:red">${elimByWinner?.name || "None"}</span></p>
            </div>
            <button class="toggle-results-btn" onclick="toggleResults(this)">👁 Show Official Results</button>
        `;

        const epDiv = document.createElement("div");
        epDiv.classList.add("episode-result", "collapsed");
        epDiv.innerHTML = `
            <h2>🌟 All Stars Episode ${episodeCount}</h2>
            <p><strong>🏁 Challenge:</strong> ${challenge.name}</p>
            <p><strong>👗 Runway Theme${isBall ? "s" : ""}:</strong> ${runway}</p>
            ${narrationHTML}
            ${dramaHTML}
            ${officialResultsHTML}
            <hr/>
        `;
        document.getElementById("results").appendChild(epDiv);
        setTimeout(() => epDiv.style.opacity = 1, 50);

        renderTrackRecord();
        renderLipstickHistory?.();
        episodeCount++;
    } catch (err) {
        console.error("❌ Erro em simulateAllStarsEpisode:", err);
        alert("Erro durante a simulação do episódio All Stars. Verifique o console.");
    }
}

function generateEpisodeNarration({
    top2 = [],
    winner = null,
    secondPlace = null,
    highs = [],
    lows = [],
    bottom = [],
    lipsyncWinner = null,
    lipsyncLoser = null,
    elim = null,
    elimByLoser = null,
    isAllStars = false,
    doubleShantay = false,
}) {
    const narration = [];

    // REGULAR FORMAT
    if (!isAllStars) {
        // 🎉 Narração especial para SLAYERS Premiere
        if (episodeCount === 1 && premiereFormat?.toUpperCase() === "SLAYERS" && top2.length >= 2) {
            narration.push(`🏆 ${top2.map(q => q.name).join(" and ")} were celebrated as the standout queens in the Winner Winner Premiere.`);
            narration.push(`✨ No one was critiqued negatively this week. Only positive vibes!`);
        }

        // Narração padrão (evitada no SLAYERS)
        if (!(episodeCount === 1 && premiereFormat?.toUpperCase() === "SLAYERS")) {
            if (winner && secondPlace && winner.name && secondPlace.name && winner !== secondPlace) {
                narration.push(`🏆 ${winner.name} was declared the winner of this week's challenge.`);
            }

            if (highs.length) {
                narration.push(`💫 ${highs.map(q => q.name).join(", ")} received praise for their performance.`);
            }

            if (lows.length) {
                narration.push(`⚠️ ${lows.map(q => q.name).join(", ")} struggled slightly this week.`);
            }

            if (bottom.length === 2) {
                const [btm1, btm2] = bottom;
                narration.push(`💋 ${btm1.name} and ${btm2.name} were up for elimination.`);
                if (doubleShantay) {
                    narration.push(`✨ Both delivered a powerful lipsync... Double shantay!`);
                } else if (elim) {
                    narration.push(`❌ ${elim.name} was eliminated after the lipsync.`);
                }
            }
        }
    }

    // ALL STARS FORMAT
    else {
        if (top2.length === 2) {
            narration.push(`👑 ${top2[0].name} and ${top2[1].name} were the top queens of the week.`);
        }

        if (highs.length) {
            narration.push(`💫 ${highs.map(q => q.name).join(", ")} received praise from the judges.`);
        }

        if (lows.length) {
            narration.push(`⚠️ ${lows.map(q => q.name).join(", ")} struggled in the challenge.`);
        }

        if (bottom.length >= 2) {
            const btmNames = bottom.map(q => q.name).join(" and ");
            narration.push(`💋 ${btmNames} were placed in the bottom.`);
        }

        if (lipsyncWinner && elim) {
            narration.push(`🎤 ${lipsyncWinner.name} won the lipsync and chose to eliminate ${elim.name}.`);
        }

        if (lipsyncLoser && elimByLoser && elimByLoser.name !== elim.name) {
            narration.push(`🎭 ${lipsyncLoser.name} would have eliminated ${elimByLoser.name}.`);
        }
    }

    return `<div class="narration-block">${narration.map(p => `<p>${p}</p>`).join("")}</div>`;
}

function renderLipstickHistory() {
    const container = document.getElementById("lipstickDecisions");
    if (!container) return;

    if (lipstickHistory.length === 0) {
        container.innerHTML = "";
        return;
    }

    let html = `<h2>💄 Lipstick Choices</h2>`;
    html += `<table class="lipstick-table minimalist-table"><tr>
        <th>Ep</th>
        <th>Top 2 (Winner)</th><th>Choice</th>
        <th>Top 2 (Loser)</th><th>Choice</th>
    </tr>`;

    for (const entry of lipstickHistory) {
        html += `<tr>
            <td>${entry.episode}</td>
            <td>${entry.top2A}</td>
            <td>${entry.elimA}</td>
            <td>${entry.top2B}</td>
            <td>${entry.elimB}</td>
        </tr>`;
    }

    html += `</table>`;
    container.innerHTML = html;
}

function getRelationship(queenA, queenB) {
    if (!queenA || !queenB) return 0;
    if (!queenA.relationships || !queenB.name) return 0;
    return queenA.relationships[queenB.name] || 0;
}

function simulateEpisodeOrFinale() {
    if (isFinale) {
        console.warn("🚫 The season ended.");
        return;
    }

    console.log("▶️ CHAMOU simulateEpisodeOrFinale com formato:", seasonFormat);

    const remaining = queens.filter(q => !q.eliminated);

    // ✅ Se for o primeiro episódio e o formato de premiere for SLAYERS
    if (episodeCount === 1 && premiereFormat?.toUpperCase() === "SLAYERS") {
        console.log("🎉 Executando premiere SLAYERS");
        simulateSlayersPremiere();
        return;
    }

    // ALL STARS sempre prioriza simulação própria
    if (seasonFormat === "allstars") {
        if (
            (finaleMode === "top3" && remaining.length === 3) ||
            (finaleMode === "top4" && remaining.length === 4) ||
            (finaleMode === "smackdown" && remaining.length === 4)
        ) {
            simulateFinale();
        } else {
            simulateAllStarsEpisode();
        }
        return;
    }

    // FINAIS para formato REGULAR
    if (
        (finaleMode === "top3" && remaining.length === 3) ||
        (finaleMode === "top4" && remaining.length === 4) ||
        (finaleMode === "smackdown" && remaining.length === 4)
    ) {
        simulateFinale();
        return;
    }

    if (finaleMode === "top3" && remaining.length === 4) {
        simulateSemiFinale();
        return;
    }

    // ✅ Caso comum
    simulateEpisode();
}

function simulateEpisode() {
    const remaining = queens.filter(q => !q.eliminated);
    for (const q of remaining) {
        if (!trackRecord[q.name]) {
            trackRecord[q.name] = [];
        }
    }
    if (finaleMode === 'top3' && remaining.length === 4) {
        simulateSemiFinale();
        return;
    }
    if ((finaleMode === 'top3' && remaining.length === 3) || (finaleMode === 'top4' && remaining.length === 4)) {
        simulateFinale();
        return;
    }

    const currentImmune = immuneQueen;
    if (currentImmune) {
        if (!immuneHistory[currentImmune]) immuneHistory[currentImmune] = [];
        immuneHistory[currentImmune].push(episodeCount);
    }
    immuneQueen = null;

    let availableChallenges = challenges.filter(ch => !usedChallenges.has(ch.name));
    if (availableChallenges.length === 0) {
        usedChallenges.clear();
        availableChallenges = [...challenges];
    }

    const challenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
    const isBall = challenge.name.toLowerCase().includes("ball");
    usedChallenges.add(challenge.name);
    let runway;
    let runwayList = [];

    if (isBall) {
        // Sorteia 3 temas únicos
        while (runwayList.length < 3) {
            const candidate = runwayThemes[Math.floor(Math.random() * runwayThemes.length)];
            if (!runwayList.includes(candidate)) runwayList.push(candidate);
        }
        runway = runwayList.join(" / ");
    } else {
        runway = runwayThemes[Math.floor(Math.random() * runwayThemes.length)];
    } challengeHistory.push(challenge.name);

    const scores = remaining.map(q => {
        const challengeScore = getChallengeScore(q, challenge.stats);
        const runwayScore = getRunwayScore(q, runway);
        const runwayWeight = isBall ? 0.5 : 0.3;
        const performanceWeight = 1 - runwayWeight;

        const performance = performanceWeight * challengeScore + runwayWeight * runwayScore;
        const riggory = 1 + (Math.random() * 0.4 - 0.2);
        q.score = performance * riggory;
        return q;
    });

    for (const q of scores) {
        const last3 = trackRecord[q.name].slice(-3);
        if (last3.every(r => r === "WIN")) q.score *= 0.8;
    }

    scores.sort((a, b) => b.score - a.score);

    const total = scores.length;
    let topCount = Math.round(0.3 * total);
    let bottomCount = Math.round(0.3 * total);
    if (topCount < 1) topCount = 1;
    if (bottomCount < 2) bottomCount = 2;
    if (topCount + bottomCount > total) {
        const excess = (topCount + bottomCount) - total;
        if (bottomCount > 2) bottomCount -= excess;
        else topCount -= excess;
    }

    const tops = scores.filter(q => q.name !== currentImmune).slice(0, topCount);
    const bottoms = scores.filter(q => q.name !== currentImmune).slice(-bottomCount);

    let winner = null, secondPlace = null;
    let doubleWin = false;
    const possibleWinners = tops.filter(q => trackRecord[q.name].filter(r => r === "WIN").length < 4);
    if (possibleWinners.length > 1) {
        winner = possibleWinners[0];
        secondPlace = possibleWinners[1];
    } else {
        winner = possibleWinners[0] || tops[0];
        secondPlace = tops[1];
    }

    const scoreDiff = Math.abs(winner.score - secondPlace.score);
    const totalEp = Math.ceil(queens.length - (finaleMode === 'top4' ? 4 : 3));
    const progress = episodeCount / totalEp;
    let doubleWinChance = progress >= 0.3 && progress <= 0.7 ? 0.3 : (progress > 0.7 ? 0.15 : 0);

    if (doubleWinCount < 2 && scoreDiff <= 1 && Math.random() < doubleWinChance) {
        doubleWin = true;
        doubleWinCount++;
    }

    const highs = tops.filter(q => q !== winner && (!doubleWin || q !== secondPlace));

    let bottom = [], low = [];
    const bottomAll = bottoms;
    if (bottomAll.length >= 3 && Math.random() < 0.7) {
        const ranked = bottomAll.map(q => ({
            queen: q,
            score: calculatePPE(q.name) + storylineScore(q.name)
        })).sort((a, b) => b.score - a.score);
        const saved = ranked[0].queen;
        bottom = [ranked[1].queen, ranked[2].queen];
        low = [saved];
    } else {
        bottom = bottoms.slice(-2);
        low = bottoms.slice(0, bottoms.length - 2);
    }

    const safe = scores.filter(q =>
        ![winner, secondPlace, ...highs, ...low, ...bottom].includes(q) &&
        q.name !== currentImmune
    );

    let elim = null;
    let doubleShantay = false;
    const [btm1, btm2] = bottom;
    if (btm1 && btm2) {
        const hasWin1 = trackRecord[btm1.name].includes("WIN");
        const hasWin2 = trackRecord[btm2.name].includes("WIN");
        const btms1 = trackRecord[btm1.name].filter(r => r === "BTM").length;
        const btms2 = trackRecord[btm2.name].filter(r => r === "BTM").length;
        const ppe1 = calculatePPE(btm1.name);
        const ppe2 = calculatePPE(btm2.name);
        const progress = 1 - (remaining.length / queens.length);
        let chance = 0.02 + 0.18 * progress;

        if (!doubleShantayUsed && episodeCount > 1 && hasWin1 && hasWin2 && btms1 < 4 && btms2 < 4 && ppe1 >= 3.5 && ppe2 >= 3.5) {
            chance = 0.9;
        }

        if (!doubleShantayUsed && Math.random() < chance) {
            doubleShantay = true;
            doubleShantayUsed = true;
        }

        if (!doubleShantay) {
            const tempTrackRecord = structuredClone(trackRecord);
            tempTrackRecord[btm1.name].push("BTM");
            tempTrackRecord[btm2.name].push("BTM");
            elim = decideEliminationWithCustomRecord(btm1, btm2, tempTrackRecord);
            elim.eliminated = true;
            elim.eliminatedEpisode = episodeCount;
            trackRecord[elim.name].push("ELIM");
            eliminationOrder.push(elim.name);
        }
    }

    for (const q of remaining) {
        if (elim && q.name === elim.name) continue;
        if (q.name === currentImmune) {
            trackRecord[q.name].push("SAFE");
            continue;
        }

        const wins = trackRecord[q.name].filter(r => r === "WIN").length;
        const btms = trackRecord[q.name].filter(r => r === "BTM").length;

        if (doubleWin && (q.name === winner.name || q.name === secondPlace.name)) {
            if (wins < 4) {
                trackRecord[q.name].push("WIN");
                if (immunityEnabled && episodeCount < Math.floor(queens.length / 2)) {
                    immuneQueen = q.name;
                }
            } else {
                trackRecord[q.name].push("HIGH");
            }
        } else if (q.name === winner.name) {
            if (wins < 4) {
                trackRecord[q.name].push("WIN");
                if (immunityEnabled && episodeCount < Math.floor(queens.length / 2)) {
                    immuneQueen = q.name;
                }
            } else {
                trackRecord[q.name].push("HIGH");
            }
        } else if (highs.includes(q)) {
            trackRecord[q.name].push("HIGH");
        } else if (low.includes(q)) {
            trackRecord[q.name].push("LOW");
        } else if (bottom.includes(q)) {
            const isPreFinale = finaleMode === 'top4' && remaining.length === 5;
            if (btms >= 4 && !isPreFinale) {
                trackRecord[q.name].push("LOW");
            } else {
                trackRecord[q.name].push("BTM");
            }
        } else {
            trackRecord[q.name].push("SAFE");
        }
    }

    // === RELACIONAMENTOS ===
    const currentCast = queens.filter(q => !q.eliminated);
    for (let i = 0; i < safe.length; i++) {
        for (let j = i + 1; j < safe.length; j++) {
            updateRelationship(safe[i], safe[j], 1);
        }
    }
    for (const t of [winner, ...(doubleWin ? [secondPlace] : [])]) {
        for (const h of highs) {
            updateRelationship(t, h, 1);
        }
    }
    if (bottom.length === 2) {
        updateRelationship(bottom[0], bottom[1], -3);
    }
    if (elim && bottom.length === 2) {
        const other = bottom.find(q => q.name !== elim.name);
        if (other) updateRelationship(elim, other, -2);
    }

    ensureRelationships(currentCast);

    // === DRAMA E NARRAÇÃO ===
    const drama = generateDramaNarrative(currentCast);
    const dramaHTML = drama.length ? `<p><strong>🎭 Drama:</strong><br>${drama.join("<br>")}</p>` : "";
    const narrationHTML = generateEpisodeNarration({
        winner,
        secondPlace,
        highs,
        lows: low,
        bottom,
        elim,
        doubleShantay,
        isAllStars: false
    });

    const officialResultsHTML = `
        <div class="official-results" style="display:none;">
            <p><strong>🏆 Winner:</strong> ${doubleWin ? `${winner.name} & ${secondPlace.name}` : winner.name}</p>
            <p><strong>⭐ Highs:</strong> ${highs.map(q => q.name).join(", ") || "None"}</p>
            <p><strong>✅ Safe:</strong> ${safe.map(q => q.name).join(", ") || "None"}</p>
            <p><strong>⚠️ Lows:</strong> ${low.map(q => q.name).join(", ") || "None"}</p>
            <p><strong>💋 Bottom Two:</strong> ${btm1?.name || "N/A"} vs ${btm2?.name || "N/A"}</p>
            <p><strong>❌ Eliminated:</strong> ${elim ? elim.name : "None (Double Shantay!)"}</p>
        </div>
        <button class="toggle-results-btn" onclick="toggleResults(this)">👁 Show Official Results</button>
    `;

    const epDiv = document.createElement("div");
    epDiv.classList.add("episode-result", "collapsed");
    epDiv.innerHTML = `
        <h2>🎬 EPISODE ${episodeCount}</h2>
        <p><strong>🏁 Challenge:</strong> ${challenge.name}</p>
        <p><strong>👗 Runway Theme${isBall ? "s" : ""}:</strong> ${runway}</p>
        ${narrationHTML}
        ${dramaHTML}
        ${officialResultsHTML}
        <hr/>
    `;
    document.getElementById("results").appendChild(epDiv);
    setTimeout(() => epDiv.style.opacity = 1, 50);

    renderTrackRecord();
    episodeCount++;
}

// Abrir menu de importação
function openImportMenu() {
    const container = document.getElementById('importMenu');
    const seasonContainer = document.getElementById('seasonButtonsContainer');

    if (container.style.display === 'block') {
        closeImportMenu();
        return;
    }

    container.style.display = 'block';
    seasonContainer.innerHTML = '';

    for (let s = 0; s <= 17; s++) {
        const wrapper = document.createElement('div');

        const btn = document.createElement('button');
        btn.className = 'season-btn';
        btn.textContent = s === 0 ? '⭐ Custom Queens' : `📺 Season ${s} (USA)`;
        btn.onclick = () => loadSeason(s);

        wrapper.appendChild(btn);
        seasonContainer.appendChild(wrapper);
    }
}

// Fechar menu de importação
function closeImportMenu() {
    document.getElementById('importMenu').style.display = 'none';
}

// Importar queen
function importQueen(season, index) {
    const p = allPresetQueens[season][index];

    // 🔒 Verifica se a queen já foi adicionada
    if (queens.some(q => q.name === p.name)) {
        alert(`${p.name} it was already added!`);
        return;
    }

    const q = {
        name: p.name,
        acting: p.act,
        improv: p.imp,
        comedy: p.com,
        runway: p.run,
        dance: p.dan,
        lipsync: p.lip,
        songwriting: p.song,
        charisma: p.cha,
        uniqueness: p.uni,
        nerve: p.ner,
        talent: p.tal,
        branding: p.bra,
        wit: p.wit,
        creativity: p.cre,
        versatility: p.ver,
        eliminated: false,
        eliminatedEpisode: null,
    };

    queens.push(q);
    trackRecord[q.name] = [];
    updateContestantsList();
    updateQueenCount();
}

function simulateSlayersPremiere() {
    const remaining = queens.filter(q => !q.eliminated);

    initTrackRecords(); // ← ESSENCIAL

    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    const isBall = challenge.name.toLowerCase().includes("ball"); // 👈 Adicione esta linha

    let runway;
    let runwayList = [];

    if (isBall) {
        // Sorteia 3 temas únicos
        while (runwayList.length < 3) {
            const candidate = runwayThemes[Math.floor(Math.random() * runwayThemes.length)];
            if (!runwayList.includes(candidate)) runwayList.push(candidate);
        }
        runway = runwayList.join(" / ");
    } else {
        runway = runwayThemes[Math.floor(Math.random() * runwayThemes.length)];
    } challengeHistory.push(challenge.name);

    const scores = remaining.map(q => {
        const challengeScore = getChallengeScore(q, challenge.stats);
        const runwayScore = getRunwayScore(q, runway);
        const runwayWeight = isBall ? 0.5 : 0.3;
        const performanceWeight = 1 - runwayWeight;

        const performance = performanceWeight * challengeScore + runwayWeight * runwayScore;
        const riggory = 1 + (Math.random() * 0.4 - 0.2);
        q.score = performance * riggory;
        return q;
    });

    scores.sort((a, b) => b.score - a.score);
    const top = scores.slice(0, 2); // Top 2 queens destacadas

    for (const q of top) {
        addTrackRecord(q.name, "WIN");
    }

    for (const q of scores.slice(2)) {
        addTrackRecord(q.name, "SAFE");
    }

    const narration = generateEpisodeNarration({
        top2: top,
        isAllStars: false,
        highs: [],
        lows: [],
        bottom: [],
        winner: top[0],
        secondPlace: top[1],
        elim: null
    });

    const epDiv = document.createElement("div");
    epDiv.classList.add("episode-result", "collapsed");
    epDiv.innerHTML = `
        <h2>🎉 Winner Winner Premiere</h2>
        <p><strong>🏁 Challenge:</strong> ${challenge.name}</p>
        <p><strong>👗 Runway Theme${isBall ? "s" : ""}:</strong> ${runway}</p>
        ${narration}
        <p><strong>🛡️ No one was eliminated this week.</strong></p>
        <hr/>
    `;
    document.getElementById("results").appendChild(epDiv);
    setTimeout(() => epDiv.style.opacity = 1, 50);

    eliminationOrder.push(null); // marca sem eliminação
    episodeCount++;
    renderTrackRecord(); // agora vai funcionar corretamente
}

function initTrackRecords() {
    for (const q of queens) {
        if (!trackRecord[q.name]) {
            trackRecord[q.name] = [];
        }
    }
}

function addTrackRecord(name, result) {
    if (!trackRecord[name]) {
        trackRecord[name] = [];
    }
    trackRecord[name].push(result);
}

// Desafios da temporada
const challenges = [
    { name: "Snatch Game", stats: ["comedy", "improv", "wit"] },
    { name: "Rusical", stats: ["acting", "dance", "lipsync", "talent"] },
    { name: "Ball", stats: ["runway", "fashion", "creativity"] },
    { name: "Girl Group", stats: ["dance", "lipsync", "songwriting", "charisma"] },
    { name: "Design Challenge", stats: ["runway", "creativity"] },
    { name: "Roast", stats: ["comedy", "improv", "wit"] },
    { name: "Makeover", stats: ["runway", "fashion", "branding"] },
    { name: "Acting Challenge", stats: ["acting", "nerve", "charisma"] },
    { name: "Commercial Parody", stats: ["comedy", "acting", "branding"] },
    { name: "Improv Comedy", stats: ["improv", "wit"] },
    { name: "Dance Challenge", stats: ["dance", "versatility"] },
    { name: "Sewing Challenge", stats: ["runway", "fashion", "creativity"] },
    { name: "Music Video", stats: ["acting", "dance", "songwriting", "branding"] },
    { name: "Lip Sync Extravaganza", stats: ["lipsync", "nerve"] },
    { name: "Comedy Challenge", stats: ["comedy", "wit"] },
    { name: "Branding Challenge", stats: ["branding", "charisma", "uniqueness"] },
    { name: "Talent Show", stats: ["dance", "songwriting", "lipsync", "talent"] },
    { name: "Snatch Game of Love", stats: ["comedy", "improv", "charisma"] },
    { name: "DragCon Panel", stats: ["improv", "acting", "wit"] },
    { name: "Political Debate", stats: ["improv", "comedy", "nerve"] },
    { name: "Daytime Talk Show", stats: ["charisma", "wit", "improv"] },
    { name: "Unconventional Materials", stats: ["creativity", "fashion", "versatility"] },
    { name: "Social Media Challenge", stats: ["branding", "charisma", "creativity"] },
    { name: "Acting Horror Scene", stats: ["acting", "nerve", "wit"] },
    { name: "Stand-Up Comedy", stats: ["comedy", "wit", "nerve"] },
    { name: "Drag Family Resemblance", stats: ["fashion", "branding", "runway"] },
    { name: "Historical Figure Challenge", stats: ["acting", "wit", "uniqueness"] },
    { name: "Spy Movie Challenge", stats: ["acting", "nerve", "dance"] },
    { name: "Music Remix Performance", stats: ["lipsync", "dance", "songwriting"] },
    { name: "Pageant Presentation", stats: ["runway", "charisma", "uniqueness"] },
    { name: "Fairytale Justice", stats: ["acting", "comedy", "improv"] },
    { name: "Green Screen Acting", stats: ["acting", "wit", "nerve"] },
    { name: "Queer History Monologue", stats: ["acting", "uniqueness", "charisma"] },
    { name: "Draguation Speech", stats: ["charisma", "branding", "wit"] }
];

// Temas da Runway da temporada 
const runwayThemes = [
    "Neon Realness", "Apocalyptic Eleganza", "Night of a Thousand Madonnas", "Denim & Diamonds",
    "Future of Drag", "Hometown Glory", "Pastel Perfection", "Black & White", "Feather Fantasy",
    "Fringe Benefit", "Bearded and Beautiful", "Glow in the Dark", "Leopard Print", "Ugly Dress",
    "Frozen Eleganza", "Death Becomes Her", "Butch Queen", "Futuristic Fashion", "Whore Couture",
    "Pink Planet", "Superhero Realness", "Winter Wonderland", "Devil in the Details",
    "Spring Has Sprung", "Executive Realness", "Glamazonian Airways", "Sugar Ball", "Glitter Ball",
    "Animal Kingdom", "Seasonal Runway", "Día de los Muertos", "Red for Filth", "Denim on Denim",
    "Sequins on the Runway", "My Best Judy", "Drag Family Resemblance", "Power of Makeup",
    "Red Carpet Realness", "All That Glitters", "Heavenly Bodies", "Big Hair Extravaganza",
    "Tulle Extravaganza", "White Party", "Leather and Lace", "Trains for Days", "Fascinator",
    "Workroom to Runway", "Silhouette Challenge", "Prom Queen", "Under the Sea", "She-Villains",
    "Ugly but Make it Fashion", "Ruffles", "Drag on a Dime", "Mirror Mirror", "Signature Drag", "Doppelganger Delight",
    "She Wore Flowers", "Met Gala Fantasy", "Royalty Realness", "Black Wedding", "Camp Couture", "Wings on the Runway",
    "Caged Couture", "Famous Paintings", "Rainbow Explosion", "Head-to-Toe One Color",
    "Jungle Realness", "Angelic vs Demonic", "Revenge of the Bride", "Out of This World",
    "Time Traveler’s Eleganza", "Witch Please", "Sci-Fi Siren", "Burlesque Bombshell",
    "Business Queen", "Rain on the Runway", "In My Era", "Cosmic Queen", "Appliqué Extravaganza"
];

// Status atuais
const statKeys = [
    "acting", "improv", "comedy", "runway", "dance", "lipsync", "songwriting",
    "fashion", "charisma", "uniqueness", "nerve", "talent", "branding",
    "wit", "creativity", "versatility"
];

// Aleatorizador de status
function clampStat(value) {
    return isNaN(value) ? 5 : Math.max(1, Math.min(10, value));
}

function getScore(queen, challengeStats, runwayTheme) {
    const challengeScore = challengeStats.reduce((sum, stat) => sum + queen[stat], 0) / challengeStats.length;
    const runwayScore = queen.run || queen.runway || 5;

    const personalityStats = [
        queen.charisma,
        queen.uniqueness,
        queen.nerve,
        queen.talent,
        queen.branding,
        queen.wit,
        queen.creativity,
        queen.versatility
    ];
    const personalityScore = personalityStats.reduce((sum, stat) => sum + stat, 0) / personalityStats.length;

    const baseScore =
        0.5 * challengeScore +
        0.2 * runwayScore +
        0.2 * personalityScore;

    // Novo fator de sorte/azar: afeta até ±25% do score total
    const luckFactor = 1 + (Math.random() * 0.5 - 0.25); // de 0.75 a 1.25
    const finalScore = baseScore * luckFactor;

    return finalScore;
}

function startSeason() {
    if (queens.length < 4) return alert("Add at least 4 queens to start!");

    console.log("Starting season in format:", seasonFormat);

    // Inicializa relationships
    for (const q of queens) {
        if (!q.relationships) q.relationships = {};
        for (const other of queens) {
            if (q !== other && !(other.name in q.relationships)) {
                q.relationships[other.name] = 0;
            }
        }
    }

    // Em vez de ocultar #scaleWrapper, oculte apenas a parte de criação
    document.querySelector(".queen-setup-panel").style.display = "none";
    document.querySelector(".format-grid").style.display = "none";

    // Mostrar o simulador
    document.getElementById("simulator").style.display = "block";

    renderTrackRecord();
}

function setSeasonPremiere(format) {
    premiereFormat = format;

    document.getElementById("btn-normal").classList.remove("selected");
    document.getElementById("btn-slayers").classList.remove("selected");

    if (format === "regular") {
        document.getElementById("btn-normal").classList.add("selected");
    } else if (format === "slayers") {
        document.getElementById("btn-slayers").classList.add("selected");
    }

    console.log("Premiere format set to:", premiereFormat);
}

function calculatePPE(name) {
    const rec = trackRecord[name];
    if (!rec) return 0;

    const points = { WIN: 5, HIGH: 4, SAFE: 3, LOW: 2, BTM: 1, ELIM: 0 };
    let sum = 0, count = 0;

    for (let i = 0; i < rec.length; i++) {
        const val = rec[i];

        if (challengeHistory[i] === "Finale") continue;

        let adjustedVal = val;

        // Se for All Stars e resultado for TOP2, considerar como WIN
        if (seasonFormat === "allstars" && val === "TOP2") {
            adjustedVal = "WIN";
        }

        if (points[adjustedVal] !== undefined) {
            sum += points[adjustedVal];
            count++;
        }
    }

    return count > 0 ? sum / count : 0;
}

function getMissCongeniality() {
    const nonFinalists = queens.filter(q => q.eliminated && q.eliminatedEpisode < episodeCount);
    if (nonFinalists.length === 0) return null;

    return nonFinalists
        .map(q => {
            const personalityScore = (
                q.charisma + q.uniqueness + q.nerve + q.talent +
                q.branding + q.wit + q.creativity + q.versatility
            ) / 8;

            const story = storylineScore(q.name) || 0;
            const ppe = calculatePPE(q.name);

            const finalScore =
                0.6 * personalityScore +
                0.3 * (story / episodeCount) +
                0.1 * ppe;

            return { queen: q, score: finalScore };
        })
        .sort((a, b) => b.score - a.score)[0].queen;
}

function storylineScore(name) {
    const rec = trackRecord[name];
    if (!rec) return 0;
    let score = 0;
    for (const result of rec) {
        switch (result) {
            case "WIN": score += 3; break;
            case "HIGH":
            case "BTM": score += 2; break;
            case "LOW": score += 1.5; break;
            case "SAFE": score += 0.5; break;
            case "ELIM": score += 0; break;
        }
    }
    return score;
}

function generateDramaNarrative(cast) {
    const potentialDrama = [];

    for (let i = 0; i < cast.length; i++) {
        for (let j = i + 1; j < cast.length; j++) {
            const q1 = cast[i];
            const q2 = cast[j];
            const rel = q1.relationships?.[q2.name] ?? 0;

            // DRAMA negativo
            if (rel <= -6) {
                potentialDrama.push({ type: "🔥", text: `🔥 There’s clear tension between ${q1.name} and ${q2.name}!`, delta: -3, q1, q2 });
            } else if (rel <= -3 && Math.random() < 0.8) {
                potentialDrama.push({ type: "💬", text: `💬 ${q1.name} is throwing shade at ${q2.name} backstage.`, delta: -2, q1, q2 });
            } else if (Math.abs(rel) < 2 && Math.random() < 0.1) {
                potentialDrama.push({ type: "😐", text: `😐 There's some passive tension between ${q1.name} and ${q2.name}.`, delta: -1, q1, q2 });
            } else if (Math.random() < 0.04) {
                potentialDrama.push({ type: "👀", text: `👀 ${q1.name} threw shade at ${q2.name} just for fun.`, delta: -1, q1, q2 });
            }

            // BOND positivo
            if (rel >= 7 && Math.random() < 0.4) {
                potentialDrama.push({ type: "💞", text: `💞 ${q1.name} and ${q2.name} are inseparable this week.`, delta: +2, q1, q2 });
            } else if (rel >= 4 && Math.random() < 0.2) {
                potentialDrama.push({ type: "😌", text: `😌 ${q1.name} is praising ${q2.name}'s performance today.`, delta: +1, q1, q2 });
            } else if (Math.random() < 0.04) {
                potentialDrama.push({ type: "💖", text: `💖 ${q1.name} and ${q2.name} bonded over a heartfelt moment.`, delta: +1, q1, q2 });
            }
        }
    }

    // Embaralha os eventos
    const selectedDrama = potentialDrama.sort(() => Math.random() - 0.5).slice(0, 5);

    // Atualiza os relacionamentos (positivo ou negativo)
    for (const entry of selectedDrama) {
        updateRelationship(entry.q1, entry.q2, entry.delta);
    }

    return selectedDrama.map(e => e.text);
}

function ensureRelationships(cast) {
    for (const q of cast) {
        if (!q.relationships) q.relationships = {};
        for (const other of cast) {
            if (q !== other && !(other.name in q.relationships)) {
                q.relationships[other.name] = 0;
            }
        }
    }
}

function getChallengeScore(queen, requiredStats) {
    let total = 0;
    for (const stat of requiredStats) {
        total += queen[stat] || 0;
    }
    return total / requiredStats.length;
}

function getRunwayScore(queen, theme) {
    // Exemplo simples: usar atributo "fashion", "charisma" e "creativity"
    return ((queen.fashion || 0) + (queen.charisma || 0) + (queen.creativity || 0)) / 3;
}

function renderTrackRecord() {
    const container = document.getElementById("trackRecord");
    container.innerHTML = "";

    const finaleIndex = challengeHistory.lastIndexOf("Finale");

    const sorted = [...queens].sort((a, b) => {
        const aTrack = trackRecord[a.name] ?? [];
        const bTrack = trackRecord[b.name] ?? [];

        const aFinaleVal = aTrack[finaleIndex];
        const bFinaleVal = bTrack[finaleIndex];

        const aIsWinner = aFinaleVal === "WIN";
        const bIsWinner = bFinaleVal === "WIN";
        if (aIsWinner && !bIsWinner) return -1;
        if (!aIsWinner && bIsWinner) return 1;

        const aIsRunnerUp = aFinaleVal === "RUNNER-UP";
        const bIsRunnerUp = bFinaleVal === "RUNNER-UP";
        if (aIsRunnerUp && !bIsRunnerUp) return -1;
        if (!aIsRunnerUp && bIsRunnerUp) return 1;

        // ❌ Removido qualquer empurrão de MISS C. para o fim
        // ✅ Segue ordenação natural por eliminação
        return (b.eliminatedEpisode ?? Infinity) - (a.eliminatedEpisode ?? Infinity);
    });

    let html = `<h2>📊 Track Record</h2><table><tr><th>Queen</th>`;

    for (let i = 0; i < episodeCount; i++) {
        html += `<th>Ep ${i + 1}</th>`;
    }

    html += `<th>PPE</th></tr>`;

    for (const q of sorted) {
        html += `<tr><td>${q.name}</td>`;

        for (let i = 0; i < episodeCount; i++) {
            let val = trackRecord[q.name]?.[i] || "";
            let tooltip = challengeHistory[i] || `Episode ${i + 1}`;
            let label = "";
            let classes = "";

            // SAFE + IMUNE
            if (val === "SAFE" && immuneHistory[q.name]?.includes(i + 1)) {
                classes += " safe-immune";
            }

            if (challengeHistory[i] === "Finale") {
                const isFinaleEp = i === finaleIndex;
                const isMissC = missCongeniality?.name === q.name;
                const finaleVal = val;

                if (finaleVal === "WIN") {
                    label = "WINNER";
                    classes = "WINNER";
                } else if (finaleVal === "RUNNER-UP") {
                    label = "RUNNER-UP";
                    classes = "RUNNER-UP";
                } else if (finaleVal === "ELIMINATED") {
                    label = "ELIMINATED";
                    classes = "finale-elim";
                } else if (finaleVal === "MISS-CONGENIALITY" || isMissC) {
                    label = "MISS C.";
                    classes = "MISS-CONGENIALITY";
                } else if (isFinaleEp) {
                    label = "GUEST";
                    classes = "GUEST";
                }
            }

            html += `<td class="${classes || val}" title="${tooltip}">${label || val}</td>`;
        }

        const ppe = calculatePPE(q.name).toFixed(2);
        html += `<td>${ppe}</td></tr>`;
    }

    html += `</table>`;
    container.innerHTML = html;

    if (typeof renderRelationshipMatrix === "function") {
        renderRelationshipMatrix();
    }
}

function simulateSemiFinale() {
    const remaining = queens.filter(q => !q.eliminated);
    const output = document.getElementById("results");

    challengeHistory.push("Semi-Finale");

    const ranked = remaining.map(q => {
        const track = calculatePPE(q.name);
        const story = storylineScore(q.name);
        const lips = q.lipsync / 10;
        const runway = q.runway / 10;

        // 💡 Novo: cálculo de performance no desafio do episódio
        const challengeScore = (
            q.acting * 0.2 +
            q.comedy * 0.2 +
            q.dance * 0.2 +
            q.runway * 0.15 +
            q.wit * 0.15 +
            q.charisma * 0.1
        ) / 10;

        const rand = (Math.random() * 0.4 - 0.2); // sorte

        const totalScore = 0.3 * track +
            0.25 * (story / episodeCount) +
            0.2 * lips +
            0.1 * runway +
            0.15 * challengeScore +
            rand;

        return {
            queen: q,
            score: totalScore,
            challengeScore,
            wins: trackRecord[q.name].filter(r => r === "WIN").length,
            btms: trackRecord[q.name].filter(r => r === "BTM").length,
            ppe: track,
        };
    });

    ranked.sort((a, b) => b.score - a.score);

    // 👑 Proteção para queens com desempenho excelente
    const safeFinalists = ranked.slice(0, 3).map(e => e.queen.name);
    const potentialElim = ranked[ranked.length - 1];

    const finalistNames = ranked.slice(0, 3).map(r => r.queen.name);
    let eliminated = potentialElim.queen;

    const hasBetterTrackThanOthers =
        potentialElim.wins >= 3 && potentialElim.ppe >= 6;

    const weakerAbove = ranked.slice(0, -1).some(r => {
        return r.wins === 0 && potentialElim.wins >= 2 && r.ppe < potentialElim.ppe - 1;
    });

    if (hasBetterTrackThanOthers && weakerAbove) {
        // 🔁 Protege a queen com histórico claramente melhor
        const weakest = ranked.find(r => r.wins === 0 && r.ppe < potentialElim.ppe - 1);
        if (weakest) eliminated = weakest.queen;
    }

    eliminated.eliminated = true;
    eliminated.eliminatedEpisode = episodeCount;
    trackRecord[eliminated.name].push("ELIM");
    eliminationOrder.push(eliminated.name);

    for (let i = 0; i < ranked.length; i++) {
        const q = ranked[i].queen;
        if (q.name === eliminated.name) continue;
        trackRecord[q.name].push("SAFE");
    }

    const div = document.createElement("div");
    div.className = "episode-result";
    div.innerHTML = `
        <h2>🎬 Episode ${episodeCount}: Semi-Finale</h2>
        <p><strong>Finalists:</strong> ${finalistNames.join(", ")}</p>
        <p><strong>❌ Eliminated:</strong> ${eliminated.name}</p>
        <hr/>
    `;
    div.style.opacity = 0;
    output.appendChild(div);
    setTimeout(() => div.style.opacity = 1, 50);

    renderTrackRecord();
    episodeCount++;
}

function randomImportQueen() {
    const allImported = [];

    // Junta todas as queens de todas as temporadas
    for (const season in allPresetQueens) {
        allImported.push(...allPresetQueens[season]);
    }

    // Pegamos os nomes (normalizados) das queens já adicionadas *por temporada*
    // Criamos um mapa season -> Set de nomes das queens dessa season já no elenco
    const seasonQueensMap = {};

    for (const q of queens) {
        const season = q.season; // Assumindo que cada queen tem a propriedade "season"
        if (!seasonQueensMap[season]) {
            seasonQueensMap[season] = new Set();
        }
        seasonQueensMap[season].add(q.name.toLowerCase().trim());
    }

    // Agora filtramos todas as queens que já existem na sua própria season
    const eligible = allImported.filter(q => {
        const season = q.season;
        const nameNorm = q.name.toLowerCase().trim();

        // Se não tem queens da season no elenco ainda, pode adicionar
        if (!seasonQueensMap[season]) return true;

        // Se o nome já está naquela season, não pode adicionar
        return !seasonQueensMap[season].has(nameNorm);
    });

    if (eligible.length === 0) {
        console.log("⚠️ No new queens left to add from any season!");
        return;
    }

    const picked = eligible[Math.floor(Math.random() * eligible.length)];
    const queen = { ...picked, eliminated: false };

    // Inicializa o trackRecord se não existir
    if (!trackRecord[queen.name]) {
        trackRecord[queen.name] = [];
    }

    queens.push(queen);

    updateContestantsList();
    alert(`🎲 ${queen.name} was added!`);
}

function simulateFinale() {
    console.log("🎉 Simulando grande final!");
    isFinale = true;

    const remaining = queens.filter(q => !q.eliminated);

    // Garante que a Miss C. esteja definida
    if (!missCongeniality) {
        const eliminated = queens.filter(q => q.eliminated);
        if (eliminated.length > 0) {
            missCongeniality = eliminated[Math.floor(Math.random() * eliminated.length)];
        }
    }

    if (!challengeHistory.includes("Finale")) challengeHistory.push("Finale");
    const finaleIndex = challengeHistory.indexOf("Finale");

    let winner = null;
    let runnerUp = null;
    let eliminatedInRound1 = [];

    if (finaleMode === "smackdown") {
        [duel1A, duel1B, duel2A, duel2B] = shuffleArray(remaining);
        duel1Winner = simulateLipsync(duel1A, duel1B);
        duel2Winner = simulateLipsync(duel2A, duel2B);
        const finalLipsync = simulateLipsync(duel1Winner, duel2Winner);

        winner = finalLipsync;
        runnerUp = duel1Winner === winner ? duel2Winner : duel1Winner;
        eliminatedInRound1 = remaining.filter(q => q !== duel1Winner && q !== duel2Winner);

        for (const q of queens) {
            if (q.eliminated && q.eliminatedEpisode < episodeCount) {
                trackRecord[q.name][finaleIndex] = (missCongeniality && q.name === missCongeniality.name) ? "MISS-CONGENIALITY" : "GUEST";
            } else if (q.name === winner.name) {
                trackRecord[q.name][finaleIndex] = "WIN";
            } else if (q.name === runnerUp.name) {
                trackRecord[q.name][finaleIndex] = "RUNNER-UP";
            } else if (eliminatedInRound1.some(elim => elim.name === q.name)) {
                trackRecord[q.name][finaleIndex] = "ELIMINATED";
            } else {
                trackRecord[q.name][finaleIndex] = (missCongeniality && q.name === missCongeniality.name) ? "MISS-CONGENIALITY" : "GUEST";
            }
        }

        const finaleHTML = `
            <h2>👑 Grand Finale - All Stars Smackdown</h2>
            <p><strong>🎤 First Lipsync:</strong> ${duel1A.name} vs ${duel1B.name} → <b>${duel1Winner.name}</b></p>
            <p><strong>🎤 Second Lipsync:</strong> ${duel2A.name} vs ${duel2B.name} → <b>${duel2Winner.name}</b></p>
            <p><strong>💥 Final Lipsync:</strong> ${duel1Winner.name} vs ${duel2Winner.name} → <b>${winner.name}</b></p>
            <p>🏆 <strong>Winner:</strong> <span style="color:gold"><b>${winner.name}</b></span></p>
            <p>🥈 <strong>Runner-up:</strong> ${runnerUp.name}</p>
            <p>💋 <strong>Eliminated in Round 1:</strong> ${eliminatedInRound1.map(q => q.name).join(", ")}</p>
            <hr/>`;

        const finaleDiv = document.createElement("div");
        finaleDiv.classList.add("episode-result");
        finaleDiv.innerHTML = finaleHTML;
        document.getElementById("results").appendChild(finaleDiv);

    } else {
        // Final padrão (Top3/Top4)
        const scored = remaining.map(q => {
            const lipsyncScore = q.lipsync + Math.random() * 2;
            const runwayScore = q.runway + Math.random() * 2;
            const ppeScore = calculatePPE(q.name);
            const storyScore = storylineScore(q.name);

            const total = lipsyncScore * 0.2 + runwayScore * 0.1 + ppeScore * 0.4 + storyScore * 0.3;
            return { queen: q, total };
        }).sort((a, b) => b.total - a.total);

        winner = scored[0].queen;
        const topFinalists = scored.map(q => q.queen);

        for (const q of queens) {
            if (q.eliminated && q.eliminatedEpisode < episodeCount) {
                trackRecord[q.name][finaleIndex] = (missCongeniality && q.name === missCongeniality.name) ? "MISS-CONGENIALITY" : "GUEST";
            } else if (q.name === winner.name) {
                trackRecord[q.name][finaleIndex] = "WIN";
            } else if (topFinalists.includes(q)) {
                trackRecord[q.name][finaleIndex] = "RUNNER-UP";
            } else {
                trackRecord[q.name][finaleIndex] = (missCongeniality && q.name === missCongeniality.name) ? "MISS-CONGENIALITY" : "GUEST";
            }
        }

        const runnerNames = topFinalists.filter(q => q.name !== winner.name).map(q => q.name).join(", ");

        const finaleHTML = `
            <h2>👑 Grand Finale</h2>
            <p><strong>🏆 Winner:</strong> <span style="color:gold"><b>${winner.name}</b></span></p>
            <p><strong>🥈 Runner-up(s):</strong> ${runnerNames}</p>
            <hr/>`;

        const finaleDiv = document.createElement("div");
        finaleDiv.classList.add("episode-result");
        finaleDiv.innerHTML = finaleHTML;
        document.getElementById("results").appendChild(finaleDiv);
    }

    renderTrackRecord();
    document.getElementById("endSeasonBtn").style.display = "block";
    document.getElementById("simulateBtn").disabled = true;
}

function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function randomizeQueen() {
    const prefix = [
        "Adore", "Aiden", "Alyssa", "Asia", "Aura", "A’keria", "Barbie", "Bianca", "Blondie", "Bob", "Bombshell", "Brooke",
        "Bunny", "Candy", "Celestia", "Cherri", "Coco", "Courtney", "Crimson", "Crystal", "Crème", "Daya", "Diamond", "Diva",
        "Drama", "Duchess", "Electra", "Elliott", "Empress", "Enchantress", "Fantasia", "Fierce", "Foxy", "Galaxy", "Gia",
        "Glam", "Glitter", "Goddess", "Heidi", "Honey", "Jaida", "Jinkx", "Joey", "Kahanna", "Kahmora", "Kandy", "Kim",
        "Kitty", "LaLa", "Lady", "Laganja", "Lolly", "Luna", "Madame", "Majesty", "Marsha", "Miss", "Misty", "Miz", "Monet",
        "Monique", "Naomi", "Nina", "Nova", "Olivia", "Opal", "Pearl", "Pixie", "Plasma", "Plastique", "Princess", "Queen",
        "Ra’Jah", "Ruby", "Sapphire", "Sasha", "Sassy", "Scarlet", "Seraphina", "Silky", "Star", "Storm", "Taffy", "Tamisha",
        "The", "Tiara", "Tina", "Trixie", "Twinkle", "Utica", "Vanessa", "Velvet", "Vixen", "Willow", "Yvie", "Zsa Zsa", "Amethyst",
        "Aria", "Audrey", "Azalea", "Blanca", "Breezy", "Caprice", "Carmen", "Cherish", "Cherry", "Cicely", "Cynthia",
        "Dahlia", "Delilah", "Eden", "Fonda", "Gigi", "Harley", "Heavenly", "Honeycomb", "Jade", "Jolie", "Karma", "Kimberly",
        "Kiara", "Lola", "Lush", "Maya", "Melody", "Mercedes", "Nevaeh", "Nikki", "Poppy", "Raven", "Roxy", "Scarlett", "Simone",
        "Sinclair", "Skye", "Sophie", "Sushi", "Vera", "Vivienne", "Yasmine", "Zara", "Zelda", "Zoe", "Aspen", "Aurora", "Barbarella",
        "Bliss", "Bonnie", "Brenda", "Calypso", "Charisma", "Claudia", "Clover", "Coral", "Darling", "Deja", "Desirée", "Dolly",
        "Dominique", "Echo", "Elvira", "Fifi", "Ginger", "Indigo", "Ivana", "Jazz", "Juliana", "Kleo", "Lavender", "Lexa",
        "Magnolia", "Moxie", "Nova Rae", "Allegra", "Aspen", "Bianca", "Celeste", "Ember", "Emberlynn", "Evangeline", "Fable", "Felicity", "Giana",
        "Harlow", "Ivy", "Jocelyn", "Juniper", "Kaia", "Lark", "Lilia", "Marigold", "Marlowe", "Milan", "Ophelia",
        "Perla", "Phoenix", "Ravenna", "Sable", "Selene", "Seraphine", "Soleil", "Talia", "Teagan", "Tessa", "Thalia",
        "Una", "Veda", "Verity", "Vienna", "Violet", "Willow", "Wrenley", "Xena", "Yara", "Zabrina", "Zola", "Azaria",
        "Bellamy", "Calista", "Dahliana", "Elara", "Isolde", "Jael", "Alexia", "Anastasia", "Antoinette", "Aphrodite", "Artemis", "Aubrielle",
        "Babydoll", "Baroness", "Bea", "Bellatrix", "Berlin", "Bijou",
        "Blue", "Brielle", "Brulee", "Buffy", "Calliope", "Candyce", "Capricia", "Chardonnay", "Chastity", "Cleopatra", "Climax", "Cocolette",
        "Connie", "Corazon", "Cream", "Crimsona", "Daisy", "Danika", "Darla", "Dawnya", "Debbie", "Demetria", "Desirra", "Diamonda",
        "Dior", "Dixie", "Divana", "Dovima", "Dulce", "Elektra", "Elix", "Elodia", "Emerald", "Eternity", "Euphoria", "Evita",
        "Farra", "Fay", "Feliciana", "Flaire", "Flavia", "Flor", "Florence", "Frangelica", "Galaxyra", "Gala", "Gardenia", "Georgina",
        "Gilda", "Glimmer", "Golda", "Gucci", "Harmonia", "Harper", "Hazel", "Henrietta", "Hibiscus", "Holiday", "Holly", "Hurricane",
        "Hydrangea", "Ignacia", "Illyana", "Imperial", "India", "Infinity", "Inka", "Iolana", "Isadora", "Ivette", "Jacqueline", "Jamboree",
        "Jem", "Jessalyn", "Jubilee", "Julissa", "Kalea", "Kalista", "Karmah", "Katarina", "Katya", "Kehlani", "Kenya", "Kween",
        "Lamia", "Laurentia", "Lavanda", "Lena", "Libra", "Lilou", "Aelle", "Aferno", "Akiss", "Apunk", "Arella", "Asnaps", "Asugar", "Ata", "Awinks", "Azaria", "Azilla", "Beferno",
        "Beica", "Beish", "Belita", "Bepop", "Betrina", "Biix", "Bique", "Blish", "Boelle", "Booze", "Borella", "Bossa",
        "Braqueen", "Bubique", "Bunnyx", "Cakiss", "Cami", "Camore", "Capix", "Carix", "Cassita", "Ceisha", "Cella", "Chabee",
        "Chalush", "Cheela", "Chelle", "Chermi", "Chiwee", "Chloette", "Chuluxe", "Cibella", "Ciera", "Cillou", "Ckiki", "Clomint",
        "Clopix", "Clynn", "Coflame", "Cokiki", "Colita", "Comint", "Conniex", "Corali", "Crashi", "Criminta", "Crysita", "Cuki",
        "Dabique", "Dacoco", "Dalia", "Dapop", "Darose", "Dayra", "Debee", "Deeva", "Delix", "Denessa", "Derella", "Dianae",
        "Dinae", "Diorli", "Dizzee", "Dolette", "Donya", "Dopix", "Dorella", "Draboo", "Dranita", "Drella", "Drielle", "Droona",
        "Duche", "Dykiki", "Eazaria", "Eclissa", "Eevee", "Eglitz", "Eiko", "Eirella", "Elata", "Elbelle", "Eleesia", "Elizette",
        "Ellaferno", "Elnoir", "Elviera", "Emibella", "Empix", "Emra", "Enikah", "Ennelly", "Epiqua", "Equisha", "Eribella", "Esheek",
        "Euphoriax", "Evelle", "Exella", "Fadette", "Falaura", "Famme", "Fantini", "Fapuff", "Faylene", "Feepix", "Felula", "Ferglee",
        "Feyla", "Fiestae", "Fizza", "Flaquita", "Floraze", "Flouncé", "Foxyli", "Frambo", "Fridaa", "Frosae", "Frousha", "Fuffy",
        "Gabix", "Galonique", "Gazeelia", "Geisha", "Gemsha", "Genova", "Gildaie", "Ginx", "Glazeia", "Glimsy", "Glitzy", "Glofria",
        "Goddlyn", "Goosha", "Gorgie", "Gothyra", "Gracee", "Grisette", "Guadelu", "Guccina", "Gwenya", "Haelee", "Hafira", "Haluné",
        "Hamina", "Hanette", "Harliz", "Havisha", "Hazorra", "Heartli", "Hibell", "Hiqueen", "Hollyne", "Honeyka", "Hopeina", "Houdini",
        "Hushy", "Hylietta", "Ibella", "Icash", "Ilauria", "Ilazra", "Imber", "Imperia", "Indalia", "Ingloria", "Inkiki", "Inxé",
        "Iralee", "Iroxa", "Isadorae", "Ishbella", "Ivania", "Izluvia", "Jaela", "Jalyn", "Jamica", "Jaspearl", "Jazii", "Jemella",
        "Jennash", "Jesmira", "Jewelex", "Jinxa", "Joliny", "Jomarie", "Jovene", "Jubix", "Julphia", "Junoa", "Justinae", "Kaesha",
        "Kahlisse", "Kairah", "Kalaxia", "Kameena", "Kandique", "Karamel", "Karuna", "Katiora", "Kavina", "Keandra", "Keeli", "Kenshy",
        "Keylux", "Khalora", "Kiannae", "Kikaria", "Kimoré", "Kirstalia", "Kizzah", "Klissia", "Klovere", "Koralyn", "Kweenzi", "Kyraxe",
        "Laesha", "Laliah", "Lanique", "Larquinn", "Lasha", "Lavandra", "Lazula", "Leeva", "Lemora", "Lexula", "Libriah", "Lilita",
        "Limae", "Linasha", "Liora", "Lisset", "Loelia", "Lollyra", "Loréna", "Lucita", "Lueela", "Luminae", "Lunixe", "Lusharia",
        "Luvira", "Lysette", "Mabell", "Madivia", "Maevah", "Magara", "Maibee", "Malina", "Manasha", "Marabell", "Marquina", "Marshea",
        "Matillia", "Mavina", "Maxelle", "Maylene", "Meemee", "Melazra", "Meloria", "Mercee", "Merryx", "Mignonne", "Milasha", "Minerva",
        "Miraya", "Missora", "Mistalia", "Mizzyla", "Monacae", "Moniquez", "Montiqa", "Moonia", "Morgaxa", "Moxlyn", "Mystira", "Myvette",
        "Nabelle", "Nadess", "Naivah", "Nalaya", "Narelly", "Natira", "Nekira", "Nellasha", "Nereya", "Netasha", "Nevasha", "Nimya",
        "Niquita", "Noaelle", "Noixie", "Nonetta", "Novaira", "Nubella", "Nyalee", "Nyrella", "Obella", "Océanna", "Odaria", "Offyx",
        "Olizette", "Opalesse", "Orchidée", "Orlina", "Osheena", "Ourelie", "Ovidia", "Oxandra", "Ozette", "Pabell", "Paelina", "Palisse",
        "Panique", "Parisha", "Pattyla", "Pavonia", "Pearlex", "Peppina", "Perika", "Phairra", "Phantazia", "Phoenixx", "Pinkara", "Pittina",
        "Plutia", "Polette", "Porcelain", "Precix", "Prettyra", "Pricella", "Prinx", "Puffina", "Purluxe", "Pursha", "Puzelle", "Pyxie",
        "Qiarah", "Qozetta", "Quentina", "Quishe", "Qweesha", "Rabellee", "Raezy", "Ralette", "Ramoria", "Raqaria", "Rashae", "Raurelle",
        "Rebex", "Reignae", "Remarah", "Rensha", "Rhapsia", "Riaria", "Ristella", "Riyanna", "Rizette", "Rocquelle", "Rosanah", "Rougee",
        "Rozera", "Rubisha", "Rumelle", "Ruthx", "Sabbella", "Saffaira", "Saiax", "Salomee", "Sammirah", "Sandrina", "Saphoria", "Saralee",
        "Sasharia", "Savali", "Scarlae", "Selika", "Senovia", "Sequella", "Shaela", "Shamix", "Sharoon", "Shaurelle", "Shezra", "Shimmelle",
        "Shirel", "Shmika", "Sianae", "Sierelle", "Sizzla", "Skandii", "Slayra", "Snarlia", "Snoww", "Soela", "Sororia", "Sparkita",
        "Spellah", "Starmie", "Stelliva", "Sugarra", "Sulique", "Sushira", "Swandiva", "Syara", "Sylvarra", "Syrelli", "Taemira", "Tahnia",
        "Talixa", "Tamarra", "Tanzia", "Tashiki", "Tatisha", "Tavina", "Tazelle", "Teeka", "Tessrae", "Teyani", "Thandie", "Thellia",
        "Tiasha", "Tinsley", "Tishona", "Trixessa", "Tropika", "Tuliss", "Turqua", "Tylique", "Tzarella", "Uffina", "Ulura", "Umania",
        "Unaeva", "Unitae", "Urisha", "Utophia", "Uvixa", "Valess", "Vampette", "Vanush", "Vardella", "Vashti", "Vazia", "Veloura",
        "Venix", "Verashae", "Vespara", "Vevette", "Vianee", "Vilette", "Viozra", "Viralia", "Vivika", "Vreena", "Wavona", "Whistie",
        "Whitaya", "Wiggyx", "Willara", "Wistelle", "Wynova", "Xanisha", "Xarrah", "Xavienna", "Xelissa", "Xenara", "Xiomé", "Xonelle",
        "Yamira", "Yandessa", "Yarasha", "Yavina", "Ydalia", "Yesha", "Ylisha", "Yolana", "Yoshina", "Yzabea", "Zabella", "Zaffira",
        "Zalisha", "Zaneth", "Zaphyra", "Zaralette", "Zarsha", "Zaviana", "Zayana", "Zefira", "Zenari", "Zinovia", "Ziora", "Zynelle"
    ];
    const suffix = [
        "Act", "Bangz", "Betty", "Bliss", "Bouffant", "Burner", "Camden", "Change", "Chi", "Closet", "Colby", "Cracker",
        "Davenport", "Dawn", "Delano", "Deluxe", "Diva", "Edwards", "Envy", "Estranja", "Fierce", "Flame", "Frost", "Galaxy",
        "Ganache", "Glamour", "Glory", "Gunn", "Hall", "Heart", "Heaven", "Hytes", "Iman", "Jay", "Jones", "Love", "Lux",
        "Mateo", "Mattel", "Methyd", "Monsoon", "Montrese", "Muse", "Nights", "Oddly", "O’Hara", "Pill", "Queen", "Ri", "Rio",
        "Smalls", "Sparkle", "Starr", "Supreme", "Tiara", "Ts", "Velour", "Velvet", "Vixen", "West", "Zhane", "Addiction", "Archetype",
        "Armadillo", "Avenue", "Banshee", "Bitch", "Bliss", "Bougie", "Capone", "Carver", "Cherry", "Clever",
        "Delight", "Dynamite", "Edge", "Empress", "Fable", "Famous", "Fiesta", "Flicker", "Fluffer", "Fortune", "Glitz", "Haven",
        "Healer", "Hollywood", "Honey", "Intuition", "Lush", "Magnolia", "Mania", "Midnight", "Mystery", "Noir", "Odyssey", "Penny",
        "Pepper", "Pixie", "Pizzazz", "Poison", "Prism", "Rapture", "Rider", "Rogue", "Savage", "Scarlet", "Sinner", "Sirens",
        "Smoke", "Star", "Sugar", "Tart", "Tragedy", "Vengeance", "Venom", "Virtue", "Vogue", "Whisper", "Zodiac", "Zenith", "Amour",
        "Angel", "Belle", "Bizarre", "Bloom", "Brulee", "Candy", "Couture", "Crystal", "Dandy",
        "Diamond", "Divine", "Doll", "Dream", "Eclipse", "Flick", "Glam", "Glisten", "Halo", "Kiss",
        "Legend", "Lemonade", "Lovegood", "Mirage", "Moon", "Nyx", "Reign", "Ritz", "Rouge", "Storm",
        "Azzurro", "Belladonna", "Blaze", "Capri", "Couture", "Darling", "Divine", "Eclipse", "Enigma", "Fierceheart", "Flash",
        "Gloryhole", "Goddess", "Honeysuckle", "Honeydew", "Ivory", "Jezebel", "Jewel", "LaMode", "Lush", "Luna", "Mirage",
        "Muse", "Nyx", "Opal", "Paradise", "Posh", "Rebelheart", "Royal", "Sapphire", "Sassy", "Scarlet", "Secret", "Shimmer",
        "Sparkles", "Spice", "Stardust", "Stiletto", "Tempest", "Velvetine", "Vixen", "Whisper", "Wildflower", "Winsome", "Wren",
        "Yasmine", "Zinnia", "Zen", "Zoya", "Lovelight", "Affair", "Alure", "Arcade", "Arsenic", "Babie", "Balm", "Barbz", "Bashment", "Benz", "Bizarrella", "Blizzard", "Bloomington",
        "Boudoir", "Bubbles", "Buzz", "Carnival", "Chaos", "Cherub", "Climax", "Cocoalicious", "Comet", "Confetti", "Crème", "Crysis",
        "Dazzle", "Decadence", "Dilemma", "Disco", "Doom", "Drama", "Eden", "Ego", "Elixir", "Essence", "Exotica", "Fiercezza",
        "Flicka", "Folly", "Fool", "Frill", "Frolic", "Frostbite", "Fury", "Galaxyx", "Ganja", "Gasp", "Gato", "Gaze",
        "Giggle", "Gimmick", "Gleam", "Glinda", "Gloom", "Goo", "Gorgeous", "Grind", "Haloheart", "Hazard", "Heat", "Heist",
        "Hush", "Hysteria", "Illusion", "Incense", "Ironic", "Jazzette", "Jet", "Juju", "Khaos", "Kiki", "Kismet", "Kitten",
        "Kush", "Lash", "Legendina", "Lick", "Loco", "Lollipop", "Lovechild", "Lucid", "Lurid", "Luxx", "Mambo", "Mantra",
        "Marble", "Meow", "Messiah", "Minx", "Miracool", "Mocktail", "Mojo", "Moonrise", "Moxxi", "Mystica", "Nectar", "Neon",
        "Nirvana", "Noodle", "Novae", "Oblivion", "Orbit", "Orchid", "Outlaw", "Papaya", "Paradox", "Peach", "Peppy", "Pheromone",
        "Adoll", "Ahoney", "Alina", "Amint", "Aooze", "Ashae", "Asita", "Atia", "Atina", "Avi", "Axotica", "Beica",
        "Bellava", "Blazie", "Bloomsy", "Bluette", "Blushay", "Bobbette", "Boozelle", "Bopette", "Boujea", "Brambly", "Brixtina", "Bubbelle",
        "Bunnyah", "Burlique", "Buzzina", "Cakette", "Cameah", "Candyne", "Carmelix", "Catnip", "Chantix", "Cheeksy", "Cherique", "Cherrina",
        "Chiffoné", "Chinelle", "Chowah", "Cigarella", "Climaxa", "Clovix", "Clymax", "Cocoir", "Confecta", "Confusia", "Crissix", "Crystella",
        "Cuddlez", "Cupsy", "Curluxe", "Dahlea", "Dandyra", "Darreign", "Dazzlyn", "Deelight", "Delishka", "Delovely", "Dementra", "Desirium",
        "Dewella", "Diabla", "Diamondique", "Dijonay", "Dilexx", "Divaine", "Divara", "Divassia", "Dollique", "Dominae", "Donduh", "Dopamine",
        "Dramae", "Drizzla", "Drusilla", "Duchice", "Dulcetta", "Dumpling", "Dynamiq", "Ecstasia", "Edible", "Eglamour", "Elastra", "Elegancea",
        "Elitix", "Elyxx", "Emmagine", "Empowah", "Empressa", "Enchantah", "Enigmah", "Erosia", "Essenz", "Euphoriah", "Evanyx", "Evolva",
        "Exclaima", "Fabulisse", "Fakeme", "Fantasmi", "Farquette", "Feistyra", "Femmella", "Fetusha", "Fierris", "Finessa", "Fizelle", "Flaminya",
        "Flavora", "Fleurré", "Flicksie", "Flirtash", "Flixie", "Florique", "Fluffina", "Foolique", "Forreva", "Freakah", "Frenzi", "Frostiana",
        "Frouzza", "Fuchsa", "Funnix", "Furyssa", "Gagatha", "Galaxina", "Gaminea", "Gassia", "Gazzette", "Gemyst", "Gildaque", "Glimixa",
        "Glimsha", "Gloire", "Glowlyn", "Goosie", "Gorgix", "Grimmyx", "Guccitina", "Gushina", "Haemorrha", "Halogena", "Harlekyn", "Harpoonz",
        "Haterine", "Havisha", "Heavena", "Heistix", "Hellina", "Helleaux", "Hellaq", "Hissyra", "Honeyra", "Hoopla", "Hotphia", "Howlette",
        "Hushlyn", "Hyenita", "Hyperia", "Hypnotiq", "Iciclea", "Ignitress", "Illusha", "Impulsia", "Incendya", "Inebriya", "Infamix", "Infernina",
        "Inklyn", "Insomniaq", "Intensha", "Intriga", "Irideska", "Ivori", "Jambalaya", "Jawdroppa", "Jejuné", "Jellycia", "Jestina", "Jetflame",
        "Jiggleez", "Jinxaria", "Jouisse", "Joyrida", "Jubiletta", "Juicetta", "Jumblee", "Junetta", "Kaleidah", "Kandique", "Karambola", "Karamela",
        "Kashinah", "Kayotik", "Keenie", "Kharizma", "Khrystalle", "Kinkella", "Kisselle", "Kittenya", "Klubella", "Knocka", "Kokonyx", "Kracklin",
        "Krushia", "Kweenah", "Laffina", "Lambora", "Lashtina", "Lavulva", "Lemonina", "Lickette", "Lilinity", "Limónix", "Lingerina", "Lixxxa",
        "Loonee", "Lovena", "Loverette", "Lucifairy", "Luffina", "Lullana", "Luminya", "Lunessa", "Lurkina", "Lushyne", "Luxeina", "Lyricah",
        "Macaróna", "Madesty", "Magnetra", "Majestica", "Maladyx", "Maniqua", "Maripussy", "Masquerah", "Meanya", "Melancholia", "Melonika", "Mimique",
        "Minxyla", "Mirajia", "Mischaos", "Mochadeux", "Modestix", "Molotovah", "Momenta", "Monstrette", "Moquette", "Morbidella", "Moscata", "Mystara",
        "Mystiqua", "Napalmia", "Nastalia", "Nebulisse", "Necropop", "Nefarya", "Neonora", "Nervana", "Netique", "Nettique", "Neurotica", "Nibbles",
        "Ninahex", "Ninjette", "Nocturna", "Noodlette", "Noxxie", "Nyphoma", "Oblivique", "Occultya", "Ocearia", "Offensa", "Ombré", "Onyxxa",
        "Ophearya", "Orbitra", "Orgazzma", "Outfitta", "Overtura", "Oystella", "Paddlez", "Pandorra", "Paraffina", "Paranoir", "Pastelita", "Peachyra",
        "Peepette", "Pernix", "Petalush", "Petiqua", "Phantasya", "Phantazia", "Phobiax", "Picklez", "Pinaflirt", "Pizzaria", "Plumina", "Pneumona",
        "Poetriss", "Poinsettia", "Polariska", "Pornessa", "Posee", "Potionne", "Pouncetta", "Powdette", "Preciosa", "Premonique", "Pressha", "Primette",
        "Prismique", "Probléma", "Promisah", "Puffena", "Pulpyra", "Puppleez", "Purrsia", "Puzzles", "Pyrona", "Quanda", "Queefette", "Quickah",
        "Quietra", "Quirkina", "Raggz", "Rapturelle", "Raspberie", "Razzlyn", "Rebelez", "Reflexia", "Regretta", "Reignnix", "Renaissancea", "Requiemme",
        "Resista", "Retroka", "Revlusha", "Rewildya", "Rhapsorie", "Rhymesha", "Riddlee", "Riotette", "Risquella", "Ritualia", "Rivula", "Rizzlyn",
        "Romantika", "Rompessa", "Rosettea", "Roughyra", "Rubessa", "Rudelia", "Ruffles", "Rumorix", "Ruthlessa", "Sabbathya", "Saccharina", "Saffra",
        "Sailorina", "Salenae", "Sanguinika", "Sarcasme", "Sashé", "Sassella", "Saturna", "Saucie", "Savagera", "Scandalia", "Scarlluxe", "Screamella",
        "Scythera", "Seduxx", "Sensuelle", "Severra", "Shadeez", "Shamelle", "Sharleeka", "Shaunaé", "Shiversa", "Shockra", "Shriekah", "Shyvelle",
        "Sighra", "Sinclaria", "Sinistress", "Sistera", "Skullina", "Sleezette", "Slithra", "Smackalina", "Smushka", "Snappa", "Snicklez", "Snitchka",
        "Snuggla", "Soirelle", "Sourina", "Spankya", "Sparklyra", "Speciola", "Spelltrix", "Spicella", "Spookina", "Sprankla", "Spreezy", "Squelcha",
        "Stararia", "Starshinea", "Staticra", "Steambella", "Stiletta", "Stingra", "Stormelita", "Strangetta", "Strippa", "Strobeé", "Stuffina", "Subdella",
        "Suffrax", "Sugariah", "Sultryna", "Sundaeza", "Surrealia", "Swagga", "Swirlique", "Synestra", "Synthra", "Syrupa", "Taffix", "Tainta",
        "Talontique", "Tartalia", "Teazie", "Temptra", "Terriffina", "Testiqueen", "Thicksy", "Thirstina", "Thotarella", "Thrilline", "Thunderah", "Ticklia",
        "Tigrianna", "Tingleez", "Tinyrella", "Tiramisue", "Tombolee", "Tonguette", "Tormentina", "Toxicina", "Traumae", "Trillique", "Trixxxy", "Trompeux"

    ];
    let name;
    do {
        name = `${prefix[Math.floor(Math.random() * prefix.length)]} ${suffix[Math.floor(Math.random() * suffix.length)]}`;
    } while (queens.some(q => q.name.toLowerCase() === name.toLowerCase()));

    // ✅ Preencher o campo de nome
    document.getElementById("qName").value = name;

    // Feedback visual
    document.getElementById("qName").classList.add("highlight");
    setTimeout(() => {
        document.getElementById("qName").classList.remove("highlight");
    }, 600);

    // Geração de stats
    const statIds = [
        "act", "imp", "com", "run", "dan", "lip", "song",
        "cha", "uni", "ner", "tal", "bra", "wit", "cre", "ver",
        "fash"
    ];

    statIds.forEach(id => {
        const rand = Math.random();
        let value;

        value = Math.floor(Math.random() * 15) + 1;

        document.getElementById(id).value = value;
    });
}

function randomizeQueenStats() {
    const statIds = [
        "newQueenAct", "newQueenImp", "newQueenCom", "newQueenRun", "newQueenDan",
        "newQueenLip", "newQueenSong", "newQueenFash", "newQueenBra", "newQueenCha", "newQueenUni",
        "newQueenNer", "newQueenTal", "newQueenWit", "newQueenCre", "newQueenVer"
    ];

    statIds.forEach(id => {
        const value = Math.floor(Math.random() * 15) + 1; // ✅ Gera de 1 a 15
        document.getElementById(id).value = value;
    });
    const prefix = [
        "Adore", "Aiden", "Alyssa", "Asia", "Aura", "A’keria", "Barbie", "Bianca", "Blondie", "Bob", "Bombshell", "Brooke",
        "Bunny", "Candy", "Celestia", "Cherri", "Coco", "Courtney", "Crimson", "Crystal", "Crème", "Daya", "Diamond", "Diva",
        "Drama", "Duchess", "Electra", "Elliott", "Empress", "Enchantress", "Fantasia", "Fierce", "Foxy", "Galaxy", "Gia",
        "Glam", "Glitter", "Goddess", "Heidi", "Honey", "Jaida", "Jinkx", "Joey", "Kahanna", "Kahmora", "Kandy", "Kim",
        "Kitty", "LaLa", "Lady", "Laganja", "Lolly", "Luna", "Madame", "Majesty", "Marsha", "Miss", "Misty", "Miz", "Monet",
        "Monique", "Naomi", "Nina", "Nova", "Olivia", "Opal", "Pearl", "Pixie", "Plasma", "Plastique", "Princess", "Queen",
        "Ra’Jah", "Ruby", "Sapphire", "Sasha", "Sassy", "Scarlet", "Seraphina", "Silky", "Star", "Storm", "Taffy", "Tamisha",
        "The", "Tiara", "Tina", "Trixie", "Twinkle", "Utica", "Vanessa", "Velvet", "Vixen", "Willow", "Yvie", "Zsa Zsa", "Amethyst",
        "Aria", "Audrey", "Azalea", "Blanca", "Breezy", "Caprice", "Carmen", "Cherish", "Cherry", "Cicely", "Cynthia",
        "Dahlia", "Delilah", "Eden", "Fonda", "Gigi", "Harley", "Heavenly", "Honeycomb", "Jade", "Jolie", "Karma", "Kimberly",
        "Kiara", "Lola", "Lush", "Maya", "Melody", "Mercedes", "Nevaeh", "Nikki", "Poppy", "Raven", "Roxy", "Scarlett", "Simone",
        "Sinclair", "Skye", "Sophie", "Sushi", "Vera", "Vivienne", "Yasmine", "Zara", "Zelda", "Zoe", "Aspen", "Aurora", "Barbarella",
        "Bliss", "Bonnie", "Brenda", "Calypso", "Charisma", "Claudia", "Clover", "Coral", "Darling", "Deja", "Desirée", "Dolly",
        "Dominique", "Echo", "Elvira", "Fifi", "Ginger", "Indigo", "Ivana", "Jazz", "Juliana", "Kleo", "Lavender", "Lexa",
        "Magnolia", "Moxie", "Nova Rae", "Allegra", "Aspen", "Bianca", "Celeste", "Ember", "Emberlynn", "Evangeline", "Fable", "Felicity", "Giana",
        "Harlow", "Ivy", "Jocelyn", "Juniper", "Kaia", "Lark", "Lilia", "Marigold", "Marlowe", "Milan", "Ophelia",
        "Perla", "Phoenix", "Ravenna", "Sable", "Selene", "Seraphine", "Soleil", "Talia", "Teagan", "Tessa", "Thalia",
        "Una", "Veda", "Verity", "Vienna", "Violet", "Willow", "Wrenley", "Xena", "Yara", "Zabrina", "Zola", "Azaria",
        "Bellamy", "Calista", "Dahliana", "Elara", "Isolde", "Jael", "Alexia", "Anastasia", "Antoinette", "Aphrodite", "Artemis", "Aubrielle",
        "Babydoll", "Baroness", "Bea", "Bellatrix", "Berlin", "Bijou",
        "Blue", "Brielle", "Brulee", "Buffy", "Calliope", "Candyce", "Capricia", "Chardonnay", "Chastity", "Cleopatra", "Climax", "Cocolette",
        "Connie", "Corazon", "Cream", "Crimsona", "Daisy", "Danika", "Darla", "Dawnya", "Debbie", "Demetria", "Desirra", "Diamonda",
        "Dior", "Dixie", "Divana", "Dovima", "Dulce", "Elektra", "Elix", "Elodia", "Emerald", "Eternity", "Euphoria", "Evita",
        "Farra", "Fay", "Feliciana", "Flaire", "Flavia", "Flor", "Florence", "Frangelica", "Galaxyra", "Gala", "Gardenia", "Georgina",
        "Gilda", "Glimmer", "Golda", "Gucci", "Harmonia", "Harper", "Hazel", "Henrietta", "Hibiscus", "Holiday", "Holly", "Hurricane",
        "Hydrangea", "Ignacia", "Illyana", "Imperial", "India", "Infinity", "Inka", "Iolana", "Isadora", "Ivette", "Jacqueline", "Jamboree",
        "Jem", "Jessalyn", "Jubilee", "Julissa", "Kalea", "Kalista", "Karmah", "Katarina", "Katya", "Kehlani", "Kenya", "Kween",
        "Lamia", "Laurentia", "Lavanda", "Lena", "Libra", "Lilou", "Aelle", "Aferno", "Akiss", "Apunk", "Arella", "Asnaps", "Asugar", "Ata", "Awinks", "Azaria", "Azilla", "Beferno",
        "Beica", "Beish", "Belita", "Bepop", "Betrina", "Biix", "Bique", "Blish", "Boelle", "Booze", "Borella", "Bossa",
        "Braqueen", "Bubique", "Bunnyx", "Cakiss", "Cami", "Camore", "Capix", "Carix", "Cassita", "Ceisha", "Cella", "Chabee",
        "Chalush", "Cheela", "Chelle", "Chermi", "Chiwee", "Chloette", "Chuluxe", "Cibella", "Ciera", "Cillou", "Ckiki", "Clomint",
        "Clopix", "Clynn", "Coflame", "Cokiki", "Colita", "Comint", "Conniex", "Corali", "Crashi", "Criminta", "Crysita", "Cuki",
        "Dabique", "Dacoco", "Dalia", "Dapop", "Darose", "Dayra", "Debee", "Deeva", "Delix", "Denessa", "Derella", "Dianae",
        "Dinae", "Diorli", "Dizzee", "Dolette", "Donya", "Dopix", "Dorella", "Draboo", "Dranita", "Drella", "Drielle", "Droona",
        "Duche", "Dykiki", "Eazaria", "Eclissa", "Eevee", "Eglitz", "Eiko", "Eirella", "Elata", "Elbelle", "Eleesia", "Elizette",
        "Ellaferno", "Elnoir", "Elviera", "Emibella", "Empix", "Emra", "Enikah", "Ennelly", "Epiqua", "Equisha", "Eribella", "Esheek",
        "Euphoriax", "Evelle", "Exella", "Fadette", "Falaura", "Famme", "Fantini", "Fapuff", "Faylene", "Feepix", "Felula", "Ferglee",
        "Feyla", "Fiestae", "Fizza", "Flaquita", "Floraze", "Flouncé", "Foxyli", "Frambo", "Fridaa", "Frosae", "Frousha", "Fuffy",
        "Gabix", "Galonique", "Gazeelia", "Geisha", "Gemsha", "Genova", "Gildaie", "Ginx", "Glazeia", "Glimsy", "Glitzy", "Glofria",
        "Goddlyn", "Goosha", "Gorgie", "Gothyra", "Gracee", "Grisette", "Guadelu", "Guccina", "Gwenya", "Haelee", "Hafira", "Haluné",
        "Hamina", "Hanette", "Harliz", "Havisha", "Hazorra", "Heartli", "Hibell", "Hiqueen", "Hollyne", "Honeyka", "Hopeina", "Houdini",
        "Hushy", "Hylietta", "Ibella", "Icash", "Ilauria", "Ilazra", "Imber", "Imperia", "Indalia", "Ingloria", "Inkiki", "Inxé",
        "Iralee", "Iroxa", "Isadorae", "Ishbella", "Ivania", "Izluvia", "Jaela", "Jalyn", "Jamica", "Jaspearl", "Jazii", "Jemella",
        "Jennash", "Jesmira", "Jewelex", "Jinxa", "Joliny", "Jomarie", "Jovene", "Jubix", "Julphia", "Junoa", "Justinae", "Kaesha",
        "Kahlisse", "Kairah", "Kalaxia", "Kameena", "Kandique", "Karamel", "Karuna", "Katiora", "Kavina", "Keandra", "Keeli", "Kenshy",
        "Keylux", "Khalora", "Kiannae", "Kikaria", "Kimoré", "Kirstalia", "Kizzah", "Klissia", "Klovere", "Koralyn", "Kweenzi", "Kyraxe",
        "Laesha", "Laliah", "Lanique", "Larquinn", "Lasha", "Lavandra", "Lazula", "Leeva", "Lemora", "Lexula", "Libriah", "Lilita",
        "Limae", "Linasha", "Liora", "Lisset", "Loelia", "Lollyra", "Loréna", "Lucita", "Lueela", "Luminae", "Lunixe", "Lusharia",
        "Luvira", "Lysette", "Mabell", "Madivia", "Maevah", "Magara", "Maibee", "Malina", "Manasha", "Marabell", "Marquina", "Marshea",
        "Matillia", "Mavina", "Maxelle", "Maylene", "Meemee", "Melazra", "Meloria", "Mercee", "Merryx", "Mignonne", "Milasha", "Minerva",
        "Miraya", "Missora", "Mistalia", "Mizzyla", "Monacae", "Moniquez", "Montiqa", "Moonia", "Morgaxa", "Moxlyn", "Mystira", "Myvette",
        "Nabelle", "Nadess", "Naivah", "Nalaya", "Narelly", "Natira", "Nekira", "Nellasha", "Nereya", "Netasha", "Nevasha", "Nimya",
        "Niquita", "Noaelle", "Noixie", "Nonetta", "Novaira", "Nubella", "Nyalee", "Nyrella", "Obella", "Océanna", "Odaria", "Offyx",
        "Olizette", "Opalesse", "Orchidée", "Orlina", "Osheena", "Ourelie", "Ovidia", "Oxandra", "Ozette", "Pabell", "Paelina", "Palisse",
        "Panique", "Parisha", "Pattyla", "Pavonia", "Pearlex", "Peppina", "Perika", "Phairra", "Phantazia", "Phoenixx", "Pinkara", "Pittina",
        "Plutia", "Polette", "Porcelain", "Precix", "Prettyra", "Pricella", "Prinx", "Puffina", "Purluxe", "Pursha", "Puzelle", "Pyxie",
        "Qiarah", "Qozetta", "Quentina", "Quishe", "Qweesha", "Rabellee", "Raezy", "Ralette", "Ramoria", "Raqaria", "Rashae", "Raurelle",
        "Rebex", "Reignae", "Remarah", "Rensha", "Rhapsia", "Riaria", "Ristella", "Riyanna", "Rizette", "Rocquelle", "Rosanah", "Rougee",
        "Rozera", "Rubisha", "Rumelle", "Ruthx", "Sabbella", "Saffaira", "Saiax", "Salomee", "Sammirah", "Sandrina", "Saphoria", "Saralee",
        "Sasharia", "Savali", "Scarlae", "Selika", "Senovia", "Sequella", "Shaela", "Shamix", "Sharoon", "Shaurelle", "Shezra", "Shimmelle",
        "Shirel", "Shmika", "Sianae", "Sierelle", "Sizzla", "Skandii", "Slayra", "Snarlia", "Snoww", "Soela", "Sororia", "Sparkita",
        "Spellah", "Starmie", "Stelliva", "Sugarra", "Sulique", "Sushira", "Swandiva", "Syara", "Sylvarra", "Syrelli", "Taemira", "Tahnia",
        "Talixa", "Tamarra", "Tanzia", "Tashiki", "Tatisha", "Tavina", "Tazelle", "Teeka", "Tessrae", "Teyani", "Thandie", "Thellia",
        "Tiasha", "Tinsley", "Tishona", "Trixessa", "Tropika", "Tuliss", "Turqua", "Tylique", "Tzarella", "Uffina", "Ulura", "Umania",
        "Unaeva", "Unitae", "Urisha", "Utophia", "Uvixa", "Valess", "Vampette", "Vanush", "Vardella", "Vashti", "Vazia", "Veloura",
        "Venix", "Verashae", "Vespara", "Vevette", "Vianee", "Vilette", "Viozra", "Viralia", "Vivika", "Vreena", "Wavona", "Whistie",
        "Whitaya", "Wiggyx", "Willara", "Wistelle", "Wynova", "Xanisha", "Xarrah", "Xavienna", "Xelissa", "Xenara", "Xiomé", "Xonelle",
        "Yamira", "Yandessa", "Yarasha", "Yavina", "Ydalia", "Yesha", "Ylisha", "Yolana", "Yoshina", "Yzabea", "Zabella", "Zaffira",
        "Zalisha", "Zaneth", "Zaphyra", "Zaralette", "Zarsha", "Zaviana", "Zayana", "Zefira", "Zenari", "Zinovia", "Ziora", "Zynelle"
    ];
    const suffix = [
        "Act", "Bangz", "Betty", "Bliss", "Bouffant", "Burner", "Camden", "Change", "Chi", "Closet", "Colby", "Cracker",
        "Davenport", "Dawn", "Delano", "Deluxe", "Diva", "Edwards", "Envy", "Estranja", "Fierce", "Flame", "Frost", "Galaxy",
        "Ganache", "Glamour", "Glory", "Gunn", "Hall", "Heart", "Heaven", "Hytes", "Iman", "Jay", "Jones", "Love", "Lux",
        "Mateo", "Mattel", "Methyd", "Monsoon", "Montrese", "Muse", "Nights", "Oddly", "O’Hara", "Pill", "Queen", "Ri", "Rio",
        "Smalls", "Sparkle", "Starr", "Supreme", "Tiara", "Ts", "Velour", "Velvet", "Vixen", "West", "Zhane", "Addiction", "Archetype",
        "Armadillo", "Avenue", "Banshee", "Bitch", "Bliss", "Bougie", "Capone", "Carver", "Cherry", "Clever",
        "Delight", "Dynamite", "Edge", "Empress", "Fable", "Famous", "Fiesta", "Flicker", "Fluffer", "Fortune", "Glitz", "Haven",
        "Healer", "Hollywood", "Honey", "Intuition", "Lush", "Magnolia", "Mania", "Midnight", "Mystery", "Noir", "Odyssey", "Penny",
        "Pepper", "Pixie", "Pizzazz", "Poison", "Prism", "Rapture", "Rider", "Rogue", "Savage", "Scarlet", "Sinner", "Sirens",
        "Smoke", "Star", "Sugar", "Tart", "Tragedy", "Vengeance", "Venom", "Virtue", "Vogue", "Whisper", "Zodiac", "Zenith", "Amour",
        "Angel", "Belle", "Bizarre", "Bloom", "Brulee", "Candy", "Couture", "Crystal", "Dandy",
        "Diamond", "Divine", "Doll", "Dream", "Eclipse", "Flick", "Glam", "Glisten", "Halo", "Kiss",
        "Legend", "Lemonade", "Lovegood", "Mirage", "Moon", "Nyx", "Reign", "Ritz", "Rouge", "Storm",
        "Azzurro", "Belladonna", "Blaze", "Capri", "Couture", "Darling", "Divine", "Eclipse", "Enigma", "Fierceheart", "Flash",
        "Gloryhole", "Goddess", "Honeysuckle", "Honeydew", "Ivory", "Jezebel", "Jewel", "LaMode", "Lush", "Luna", "Mirage",
        "Muse", "Nyx", "Opal", "Paradise", "Posh", "Rebelheart", "Royal", "Sapphire", "Sassy", "Scarlet", "Secret", "Shimmer",
        "Sparkles", "Spice", "Stardust", "Stiletto", "Tempest", "Velvetine", "Vixen", "Whisper", "Wildflower", "Winsome", "Wren",
        "Yasmine", "Zinnia", "Zen", "Zoya", "Lovelight", "Affair", "Alure", "Arcade", "Arsenic", "Babie", "Balm", "Barbz", "Bashment", "Benz", "Bizarrella", "Blizzard", "Bloomington",
        "Boudoir", "Bubbles", "Buzz", "Carnival", "Chaos", "Cherub", "Climax", "Cocoalicious", "Comet", "Confetti", "Crème", "Crysis",
        "Dazzle", "Decadence", "Dilemma", "Disco", "Doom", "Drama", "Eden", "Ego", "Elixir", "Essence", "Exotica", "Fiercezza",
        "Flicka", "Folly", "Fool", "Frill", "Frolic", "Frostbite", "Fury", "Galaxyx", "Ganja", "Gasp", "Gato", "Gaze",
        "Giggle", "Gimmick", "Gleam", "Glinda", "Gloom", "Goo", "Gorgeous", "Grind", "Haloheart", "Hazard", "Heat", "Heist",
        "Hush", "Hysteria", "Illusion", "Incense", "Ironic", "Jazzette", "Jet", "Juju", "Khaos", "Kiki", "Kismet", "Kitten",
        "Kush", "Lash", "Legendina", "Lick", "Loco", "Lollipop", "Lovechild", "Lucid", "Lurid", "Luxx", "Mambo", "Mantra",
        "Marble", "Meow", "Messiah", "Minx", "Miracool", "Mocktail", "Mojo", "Moonrise", "Moxxi", "Mystica", "Nectar", "Neon",
        "Nirvana", "Noodle", "Novae", "Oblivion", "Orbit", "Orchid", "Outlaw", "Papaya", "Paradox", "Peach", "Peppy", "Pheromone",
        "Adoll", "Ahoney", "Alina", "Amint", "Aooze", "Ashae", "Asita", "Atia", "Atina", "Avi", "Axotica", "Beica",
        "Bellava", "Blazie", "Bloomsy", "Bluette", "Blushay", "Bobbette", "Boozelle", "Bopette", "Boujea", "Brambly", "Brixtina", "Bubbelle",
        "Bunnyah", "Burlique", "Buzzina", "Cakette", "Cameah", "Candyne", "Carmelix", "Catnip", "Chantix", "Cheeksy", "Cherique", "Cherrina",
        "Chiffoné", "Chinelle", "Chowah", "Cigarella", "Climaxa", "Clovix", "Clymax", "Cocoir", "Confecta", "Confusia", "Crissix", "Crystella",
        "Cuddlez", "Cupsy", "Curluxe", "Dahlea", "Dandyra", "Darreign", "Dazzlyn", "Deelight", "Delishka", "Delovely", "Dementra", "Desirium",
        "Dewella", "Diabla", "Diamondique", "Dijonay", "Dilexx", "Divaine", "Divara", "Divassia", "Dollique", "Dominae", "Donduh", "Dopamine",
        "Dramae", "Drizzla", "Drusilla", "Duchice", "Dulcetta", "Dumpling", "Dynamiq", "Ecstasia", "Edible", "Eglamour", "Elastra", "Elegancea",
        "Elitix", "Elyxx", "Emmagine", "Empowah", "Empressa", "Enchantah", "Enigmah", "Erosia", "Essenz", "Euphoriah", "Evanyx", "Evolva",
        "Exclaima", "Fabulisse", "Fakeme", "Fantasmi", "Farquette", "Feistyra", "Femmella", "Fetusha", "Fierris", "Finessa", "Fizelle", "Flaminya",
        "Flavora", "Fleurré", "Flicksie", "Flirtash", "Flixie", "Florique", "Fluffina", "Foolique", "Forreva", "Freakah", "Frenzi", "Frostiana",
        "Frouzza", "Fuchsa", "Funnix", "Furyssa", "Gagatha", "Galaxina", "Gaminea", "Gassia", "Gazzette", "Gemyst", "Gildaque", "Glimixa",
        "Glimsha", "Gloire", "Glowlyn", "Goosie", "Gorgix", "Grimmyx", "Guccitina", "Gushina", "Haemorrha", "Halogena", "Harlekyn", "Harpoonz",
        "Haterine", "Havisha", "Heavena", "Heistix", "Hellina", "Helleaux", "Hellaq", "Hissyra", "Honeyra", "Hoopla", "Hotphia", "Howlette",
        "Hushlyn", "Hyenita", "Hyperia", "Hypnotiq", "Iciclea", "Ignitress", "Illusha", "Impulsia", "Incendya", "Inebriya", "Infamix", "Infernina",
        "Inklyn", "Insomniaq", "Intensha", "Intriga", "Irideska", "Ivori", "Jambalaya", "Jawdroppa", "Jejuné", "Jellycia", "Jestina", "Jetflame",
        "Jiggleez", "Jinxaria", "Jouisse", "Joyrida", "Jubiletta", "Juicetta", "Jumblee", "Junetta", "Kaleidah", "Kandique", "Karambola", "Karamela",
        "Kashinah", "Kayotik", "Keenie", "Kharizma", "Khrystalle", "Kinkella", "Kisselle", "Kittenya", "Klubella", "Knocka", "Kokonyx", "Kracklin",
        "Krushia", "Kweenah", "Laffina", "Lambora", "Lashtina", "Lavulva", "Lemonina", "Lickette", "Lilinity", "Limónix", "Lingerina", "Lixxxa",
        "Loonee", "Lovena", "Loverette", "Lucifairy", "Luffina", "Lullana", "Luminya", "Lunessa", "Lurkina", "Lushyne", "Luxeina", "Lyricah",
        "Macaróna", "Madesty", "Magnetra", "Majestica", "Maladyx", "Maniqua", "Maripussy", "Masquerah", "Meanya", "Melancholia", "Melonika", "Mimique",
        "Minxyla", "Mirajia", "Mischaos", "Mochadeux", "Modestix", "Molotovah", "Momenta", "Monstrette", "Moquette", "Morbidella", "Moscata", "Mystara",
        "Mystiqua", "Napalmia", "Nastalia", "Nebulisse", "Necropop", "Nefarya", "Neonora", "Nervana", "Netique", "Nettique", "Neurotica", "Nibbles",
        "Ninahex", "Ninjette", "Nocturna", "Noodlette", "Noxxie", "Nyphoma", "Oblivique", "Occultya", "Ocearia", "Offensa", "Ombré", "Onyxxa",
        "Ophearya", "Orbitra", "Orgazzma", "Outfitta", "Overtura", "Oystella", "Paddlez", "Pandorra", "Paraffina", "Paranoir", "Pastelita", "Peachyra",
        "Peepette", "Pernix", "Petalush", "Petiqua", "Phantasya", "Phantazia", "Phobiax", "Picklez", "Pinaflirt", "Pizzaria", "Plumina", "Pneumona",
        "Poetriss", "Poinsettia", "Polariska", "Pornessa", "Posee", "Potionne", "Pouncetta", "Powdette", "Preciosa", "Premonique", "Pressha", "Primette",
        "Prismique", "Probléma", "Promisah", "Puffena", "Pulpyra", "Puppleez", "Purrsia", "Puzzles", "Pyrona", "Quanda", "Queefette", "Quickah",
        "Quietra", "Quirkina", "Raggz", "Rapturelle", "Raspberie", "Razzlyn", "Rebelez", "Reflexia", "Regretta", "Reignnix", "Renaissancea", "Requiemme",
        "Resista", "Retroka", "Revlusha", "Rewildya", "Rhapsorie", "Rhymesha", "Riddlee", "Riotette", "Risquella", "Ritualia", "Rivula", "Rizzlyn",
        "Romantika", "Rompessa", "Rosettea", "Roughyra", "Rubessa", "Rudelia", "Ruffles", "Rumorix", "Ruthlessa", "Sabbathya", "Saccharina", "Saffra",
        "Sailorina", "Salenae", "Sanguinika", "Sarcasme", "Sashé", "Sassella", "Saturna", "Saucie", "Savagera", "Scandalia", "Scarlluxe", "Screamella",
        "Scythera", "Seduxx", "Sensuelle", "Severra", "Shadeez", "Shamelle", "Sharleeka", "Shaunaé", "Shiversa", "Shockra", "Shriekah", "Shyvelle",
        "Sighra", "Sinclaria", "Sinistress", "Sistera", "Skullina", "Sleezette", "Slithra", "Smackalina", "Smushka", "Snappa", "Snicklez", "Snitchka",
        "Snuggla", "Soirelle", "Sourina", "Spankya", "Sparklyra", "Speciola", "Spelltrix", "Spicella", "Spookina", "Sprankla", "Spreezy", "Squelcha",
        "Stararia", "Starshinea", "Staticra", "Steambella", "Stiletta", "Stingra", "Stormelita", "Strangetta", "Strippa", "Strobeé", "Stuffina", "Subdella",
        "Suffrax", "Sugariah", "Sultryna", "Sundaeza", "Surrealia", "Swagga", "Swirlique", "Synestra", "Synthra", "Syrupa", "Taffix", "Tainta",
        "Talontique", "Tartalia", "Teazie", "Temptra", "Terriffina", "Testiqueen", "Thicksy", "Thirstina", "Thotarella", "Thrilline", "Thunderah", "Ticklia",
        "Tigrianna", "Tingleez", "Tinyrella", "Tiramisue", "Tombolee", "Tonguette", "Tormentina", "Toxicina", "Traumae", "Trillique", "Trixxxy", "Trompeux"
    ];
    const name = `${prefix[Math.floor(Math.random() * prefix.length)]} ${suffix[Math.floor(Math.random() * suffix.length)]}`;

    document.getElementById("newQueenName").value = name;
}

window.randomizeQueenStats = randomizeQueenStats;

function createQueen(name, stats = {}) {
    return {
        name: name,
        eliminated: false,
        eliminatedEpisode: null,
        relationships: {}, // novo campo para o sistema de relacionamentos
        acting: stats.acting || 5,
        improv: stats.improv || 5,
        comedy: stats.comedy || 5,
        runway: stats.runway || 5,
        dance: stats.dance || 5,
        lipsync: stats.lipsync || 5,
        songwriting: stats.songwriting || 5,
        charisma: stats.charisma || 5,
        uniqueness: stats.uniqueness || 5,
        nerve: stats.nerve || 5,
        talent: stats.talent || 5,
        branding: stats.branding || 5,
        wit: stats.wit || 5,
        creativity: stats.creativity || 5,
        versatility: stats.versatility || 5,
    };
}

document.getElementById("queenForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("qName").value.trim();
    if (!name) return alert("Queen name is required.");
    if (queens.some(queen => queen.name.toLowerCase() === name.toLowerCase())) {
        return alert("Queen name already exists!");
    }

    const stats = {
        acting: clampStat(+document.getElementById("act").value),
        improv: clampStat(+document.getElementById("imp").value),
        comedy: clampStat(+document.getElementById("com").value),
        runway: clampStat(+document.getElementById("run").value),
        dance: clampStat(+document.getElementById("dan").value),
        lipsync: clampStat(+document.getElementById("lip").value),
        songwriting: clampStat(+document.getElementById("song").value),
        charisma: clampStat(+document.getElementById("cha").value),
        uniqueness: clampStat(+document.getElementById("uni").value),
        nerve: clampStat(+document.getElementById("ner").value),
        talent: clampStat(+document.getElementById("tal").value),
        branding: clampStat(+document.getElementById("bra").value),
        wit: clampStat(+document.getElementById("wit").value),
        creativity: clampStat(+document.getElementById("cre").value),
        versatility: clampStat(+document.getElementById("ver").value),
    };

    const queen = createQueen(name, stats);
    queens.push(queen);
    trackRecord[queen.name] = [];

    updateContestantsList(); `
        <div class="queen-card">
            <div class="queen-name">👑 ${queen.name}</div>
        </div>
    `;
    document.getElementById("queenCount").textContent = `(${queens.length})`;
    document.getElementById("queenForm").reset();
});

function updateRelationship(queenA, queenB, amount) {
    if (queenA.name === queenB.name) return;

    if (!queenA.relationships) queenA.relationships = {};
    if (!queenB.relationships) queenB.relationships = {};

    if (!queenA.relationships[queenB.name]) queenA.relationships[queenB.name] = 0;
    if (!queenB.relationships[queenA.name]) queenB.relationships[queenA.name] = 0;

    let amplified;
    if (amount > 0) {
        amplified = amount * 2.2; // positivo levemente aumentado
    } else {
        amplified = amount * 1.8; // negativo suavizado
    }

    queenA.relationships[queenB.name] = Math.round((queenA.relationships[queenB.name] + amplified) * 10) / 10;
    queenB.relationships[queenA.name] = Math.round((queenB.relationships[queenA.name] + amplified) * 10) / 10;

    // Limites de relacionamento
    queenA.relationships[queenB.name] = Math.max(-30, Math.min(20, queenA.relationships[queenB.name]));
    queenB.relationships[queenA.name] = Math.max(-30, Math.min(20, queenB.relationships[queenA.name]));
}

function applyDramaToRelationships(drama, currentCast) {
    let dramaCount = 0;
    const maxDrama = 5;

    outerLoop:
    for (let i = 0; i < currentCast.length; i++) {
        for (let j = i + 1; j < currentCast.length; j++) {
            const q1 = currentCast[i];
            const q2 = currentCast[j];
            const chance = Math.random();

            if (chance < 0.1) {
                updateRelationship(q1, q2, -Math.floor(Math.random() * 6 + 3)); // -3 a -8
                drama.push(`🔥 ${q1.name} and ${q2.name} had a fight backstage!`);
                dramaCount++;
            } else if (chance > 0.9) {
                updateRelationship(q1, q2, Math.floor(Math.random() * 6 + 3)); // +3 a +8
                drama.push(`💖 ${q1.name} and ${q2.name} bonded over a heartfelt moment.`);
                dramaCount++;
            }

            if (dramaCount >= maxDrama) break outerLoop;
        }
    }
}

function renderRelationshipMatrix() {
    const current = queens.filter(q => !q.eliminated);
    if (current.length === 0) return;

    let html = "<h3>🧠 Relationships</h3><table class='rel-matrix'><tr><th></th>";
    for (const q of current) html += `<th>${q.name}</th>`;
    html += "</tr>";

    for (const q1 of current) {
        html += `<tr><th>${q1.name}</th>`;
        for (const q2 of current) {
            if (q1.name === q2.name) {
                html += "<td>—</td>";
            } else {
                const score = q1.relationships[q2.name] ?? 0;
                let color = "black", icon = "", tooltip = "";

                if (score > 7) {
                    color = "green";
                    icon = "💞";
                    tooltip = "Close allies";
                } else if (score > 3) {
                    color = "darkgreen";
                    icon = "✨";
                    tooltip = "Friendly";
                } else if (score < -7) {
                    color = "red";
                    icon = "🔥";
                    tooltip = "Rivalry!";
                } else if (score < -3) {
                    color = "darkred";
                    icon = "👀";
                    tooltip = "Tension";
                } else {
                    color = "gray";
                    icon = "❓";
                    tooltip = "Neutral or undefined";
                }

                html += `<td style="color:${color}" title="${tooltip}">${score > 0 ? "+" : ""}${score} ${icon}</td>`;
            }
        }
        html += "</tr>";
    }

    html += "</table>";

    const container = document.getElementById("relationshipMatrix");
    container.innerHTML = html;
}

document.getElementById("title").addEventListener("click", resetSimulator);

document.getElementById("queenCount").textContent = `(0)`;

document.getElementById("title").addEventListener("click", () => {
    document.getElementById("scaleWrapper").style.display = "block";
    document.getElementById("simulator").style.display = "none";
    document.getElementById("results").innerHTML = "";
    document.getElementById("trackRecord").innerHTML = "";
    document.querySelector("#simulator button").disabled = false;
    episodeCount = 1;
    doubleShantayUsed = false;
    eliminationOrder = [];
    challengeHistory.length = 0;
    for (const q of queens) {
        q.eliminated = false;
        q.eliminatedEpisode = null;
        trackRecord[q.name] = [];
    }
});

function closeIntro() {
    const intro = document.getElementById("introPanel");

    // ativa fade-out
    intro.classList.add("fade-out");

    setTimeout(() => {
        intro.remove(); // ou intro.style.display = "none";
        document.body.classList.add("intro-ended"); // ativa visibilidade do conteúdo
    }, 600);
}

function updateContestantsList() {
    console.log("🔁 updateContestantsList foi chamado");
    const list = document.getElementById('contestantsList');
    list.innerHTML = '';

    queens.forEach((q, index) => {
        const card = document.createElement('div');
        card.className = 'queen-card';
        card.style.position = 'relative';

        const removeBtn = document.createElement('span');
        removeBtn.className = 'remove-btn';
        removeBtn.innerText = '✖';
        removeBtn.onclick = () => removeQueen(index);

        const nameSpan = document.createElement('div');
        nameSpan.className = 'queen-name';
        nameSpan.innerText = `👑 ${q.name}`;

        card.appendChild(removeBtn);
        card.appendChild(nameSpan);
        list.appendChild(card);
    });

    updateQueenCount(); // ✅ garante que o número no topo atualize também
}

function removeQueen(index) {
    const removed = queens.splice(index, 1)[0];
    delete trackRecord[removed.name];
    updateContestantsList();
    updateQueenCount();
}

function updateQueenCount() {
    document.getElementById('queenCount').textContent = `(${queens.length})`;
}

function updateFinalType() {
    const dropdown = document.getElementById("finalTypeDropdown");
    finalType = dropdown.value;
}

function selectFinaleMode(mode) {
    const buttons = document.querySelectorAll('.finale-mode-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));

    const clicked = [...buttons].find(btn =>
        (mode === "smackdown" && btn.textContent.includes("Smackdown")) ||
        (mode.startsWith("top") && btn.textContent.includes(mode.split("top")[1]))
    );
    if (clicked) clicked.classList.add('selected');

    finaleMode = mode;
}

function saveNewQueen() {
    const name = document.getElementById('newQueenName').value.trim();
    if (!name) return alert("Please enter a name.");

    const newQueen = {
        name,
        act: +document.getElementById('newQueenAct').value || 5,
        imp: +document.getElementById('newQueenImp').value || 5,
        com: +document.getElementById('newQueenCom').value || 5,
        run: +document.getElementById('newQueenRun').value || 5,
        dan: +document.getElementById('newQueenDan').value || 5,
        lip: +document.getElementById('newQueenLip').value || 5,
        song: +document.getElementById('newQueenSong').value || 5,
        bra: +document.getElementById('newQueenBra').value || 5,
        fash: +document.getElementById('newQueenFash').value || 5, // 👗 Fashion
        cha: 6, uni: 6, ner: 6, tal: 6, wit: 6, cre: 6, ver: 6
    };

    let savedQueens = JSON.parse(localStorage.getItem('customQueens')) || [];
    if (savedQueens.find(q => q.name === newQueen.name)) {
        return alert("A queen with this name already exists.");
    }

    savedQueens.push(newQueen);
    localStorage.setItem('customQueens', JSON.stringify(savedQueens));
    alert("Queen saved!");

    // ❌ Remover o fechamento do painel
    // document.getElementById('createQueenPanel').classList.add('hidden');

    // ✅ Limpa os campos para uma nova criação
    resetCreateQueenForm();

    // ✅ Atualiza visualmente a lista de custom queens (se estiver aberta)
    const open = document.getElementById("season-0-queens");
    if (open) loadSeason(0);
}

function resetCreateQueenForm() {
    document.getElementById("newQueenName").value = "";

    const statIds = [
        "newQueenAct", "newQueenImp", "newQueenCom", "newQueenRun", "newQueenDan",
        "newQueenLip", "newQueenSong", "newQueenFash", "newQueenCha", "newQueenUni",
        "newQueenNer", "newQueenTal", "newQueenBra", "newQueenWit", "newQueenCre", "newQueenVer"
    ];

    statIds.forEach(id => {
        document.getElementById(id).value = "";
    });
}

let currentOpenSeason = null;

function loadSeason(seasonNum) {
    const existing = document.getElementById(`season-${seasonNum}-queens`);

    if (existing) {
        existing.remove();
        currentOpenSeason = null;
        return;
    }

    if (currentOpenSeason !== null && currentOpenSeason !== seasonNum) {
        const openDiv = document.getElementById(`season-${currentOpenSeason}-queens`);
        if (openDiv) openDiv.remove();
    }
    currentOpenSeason = seasonNum;

    let queens = [];

    if (seasonNum === 0) {
        const saved = localStorage.getItem('customQueens');
        if (!saved) return alert("No custom queens found.");
        queens = JSON.parse(saved);
    } else if (allPresetQueens && allPresetQueens[seasonNum]) {
        queens = allPresetQueens[seasonNum];
    } else {
        return alert("Season not found.");
    }

    const section = document.createElement("div");
    section.className = "season-grid";
    section.id = `season-${seasonNum}-queens`;

    queens.forEach((queen, index) => {
        const card = document.createElement("div");
        card.className = "import-card";
        card.setAttribute("data-name", queen.name);

        card.innerHTML = `
            <h3>
                ${queen.name}
                ${seasonNum === 0 ? `<span class="delete-btn" onclick="deleteCustomQueen(${index})" title="Delete Queen">❌</span>` : ""}
            </h3>
            <p>🎭 ACT: ${queen.act} | IMP: ${queen.imp} | COM: ${queen.com} | FASH: ${queen.fash}</p>
            <p>💃 RUN: ${queen.run} | DAN: ${queen.dan} | LIP: ${queen.lip} | SONG: ${queen.song}</p>
            <p>✨ CHA: ${queen.cha} | UNI: ${queen.uni} | NER: ${queen.ner} | TAL: ${queen.tal}</p>
            <p>💡 BRA: ${queen.bra} | WIT: ${queen.wit} | CRE: ${queen.cre} | VER: ${queen.ver}</p>
        `;

        const addBtn = document.createElement("button");
        addBtn.textContent = "Add";
        addBtn.style.marginTop = "10px";
        addBtn.onclick = () => {
            if (seasonNum === 0) importCustomQueen(index);
            else importQueen(seasonNum, index);
        };

        card.appendChild(addBtn);
        section.appendChild(card);
    });

    filterAllQueens();

    const seasonBtns = document.querySelectorAll(".season-btn");
    const seasonBtn = Array.from(seasonBtns).find(btn =>
        btn.textContent.includes(`Season ${seasonNum}`) || (seasonNum === 0 && btn.textContent.includes('Custom Queens'))
    );
    if (seasonBtn && seasonBtn.parentElement) {
        seasonBtn.parentElement.insertBefore(section, seasonBtn.nextSibling);
    }
}

function deleteCustomQueen(index) {
    const saved = localStorage.getItem("customQueens");
    if (!saved) return;

    const queens = JSON.parse(saved);
    const confirmed = confirm(`Are you sure you want to delete "${queens[index].name}"?`);
    if (!confirmed) return;

    queens.splice(index, 1);
    localStorage.setItem("customQueens", JSON.stringify(queens));

    // ✅ Em vez de loadSeason(0), removemos o conteúdo atual e recarregamos SEM acionar o "fechamento"
    const container = document.getElementById(`season-0-queens`);
    if (container) container.remove();

    currentOpenSeason = null; // ← impede o fechamento automático

    loadSeason(0); // ← recria a lista sem fechar o painel
}

function filterAllQueens() {
    const search = document.getElementById("importSearchInput").value.toLowerCase();
    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = "";

    if (!search.trim()) return;

    // 🔍 1. Buscar nas custom queens (season 0)
    const saved = localStorage.getItem("customQueens");
    if (saved) {
        const customQueens = JSON.parse(saved);
        customQueens.forEach((queen, index) => {
            if (queen.name.toLowerCase().includes(search)) {
                const card = document.createElement("div");
                card.className = "import-card";
                card.setAttribute("data-name", queen.name);

                card.innerHTML = `
                    <h3>${queen.name}</h3>
                    <p>🎭 ACT: ${queen.act} | IMP: ${queen.imp} | COM: ${queen.com} | FASH: ${queen.fash}</p>
                    <p>💃 RUN: ${queen.run} | DAN: ${queen.dan} | LIP: ${queen.lip} | SONG: ${queen.song}</p>
                    <p>✨ CHA: ${queen.cha} | UNI: ${queen.uni} | NER: ${queen.ner} | TAL: ${queen.tal}</p>
                    <p>💡 BRA: ${queen.bra} | WIT: ${queen.wit} | CRE: ${queen.cre} | VER: ${queen.ver}</p>
                `;

                const addBtn = document.createElement("button");
                addBtn.textContent = "Add";
                addBtn.style.marginTop = "10px";
                addBtn.onclick = () => importCustomQueen(index);

                card.appendChild(addBtn);
                resultsContainer.appendChild(card);
            }
        });
    }

    // 🔍 2. Buscar nas seasons normais (1 a N)
    for (const seasonKey in allPresetQueens) {
        const queens = allPresetQueens[seasonKey];
        if (!Array.isArray(queens)) continue;

        queens.forEach((queen, index) => {
            if (queen.name.toLowerCase().includes(search)) {
                const card = document.createElement("div");
                card.className = "import-card";
                card.setAttribute("data-name", queen.name);

                card.innerHTML = `
                    <h3>${queen.name}</h3>
                    <p>🎭 ACT: ${queen.act} | IMP: ${queen.imp} | COM: ${queen.com} | FASH: ${queen.fash}</p>
                    <p>💃 RUN: ${queen.run} | DAN: ${queen.dan} | LIP: ${queen.lip} | SONG: ${queen.song}</p>
                    <p>✨ CHA: ${queen.cha} | UNI: ${queen.uni} | NER: ${queen.ner} | TAL: ${queen.tal}</p>
                    <p>💡 BRA: ${queen.bra} | WIT: ${queen.wit} | CRE: ${queen.cre} | VER: ${queen.ver}</p>
                `;

                const addBtn = document.createElement("button");
                addBtn.textContent = "Add";
                addBtn.style.marginTop = "10px";
                addBtn.onclick = () => importQueen(seasonKey, index);

                card.appendChild(addBtn);
                resultsContainer.appendChild(card);
            }
        });
    }
}

function createQueenCard(queen, index, isCustom = false) {
    const card = document.createElement('div');
    card.className = 'import-card';
    card.setAttribute('data-name', queen.name); // ← AQUI é o que faltava

    card.innerHTML = `
        <strong>${queen.name}</strong>
        <p>Charisma: ${queen.cha} | Uniqueness: ${queen.uni}</p>
        <p>Nerve: ${queen.ner} | Talent: ${queen.tal}</p>
        <button onclick="${isCustom ? `importCustomQueen(${index})` : `importQueen(${index})`}">Add</button>
    `;

    return card;
}

function importCustomQueen(index) {
    const savedQueens = JSON.parse(localStorage.getItem('customQueens')) || [];
    const p = savedQueens[index];

    if (queens.some(q => q.name === p.name)) {
        alert("Already added!");
        return;
    }

    const q = {
        name: p.name,
        acting: p.act,
        improv: p.imp,
        comedy: p.com,
        runway: p.run,
        dance: p.dan,
        lipsync: p.lip,
        songwriting: p.song,
        branding: p.bra,
        charisma: p.cha,
        uniqueness: p.uni,
        nerve: p.ner,
        talent: p.tal,
        wit: p.wit,
        creativity: p.cre,
        versatility: p.ver,
        eliminated: false,
        eliminatedEpisode: null,
        relationships: {},
    };

    // Agora sim: adiciona ao array global correto
    queens.push(q);
    trackRecord[q.name] = [];
    updateContestantsList();
    updateQueenCount();
}

function resetSimulator() {
    // 🔄 Reset de variáveis principais
    queens.length = 0;
    eliminationOrder.length = 0;
    challengeHistory.length = 0;
    lipstickHistory.length = 0;
    usedChallenges.clear?.(); // compatível com Set

    episodeCount = 1;
    doubleShantayUsed = false;
    doubleWinCount = 0;
    immuneQueen = null;
    immunityEnabled = false;
    isFinale = false;
    finaleMode = 'top4';
    seasonFormat = "regular";
    premiereFormat = "REGULAR";
    missCongeniality = null;

    duel1A = duel1B = duel2A = duel2B = duel1Winner = duel2Winner = null;

    // 🧹 Limpa objetos de histórico
    for (const key in trackRecord) delete trackRecord[key];
    for (const key in immuneHistory) delete immuneHistory[key];

    // 🧽 Limpa a interface
    document.getElementById("results").innerHTML = "";
    document.getElementById("trackRecord").innerHTML = "";
    document.getElementById("lipstickDecisions").innerHTML = "";
    document.getElementById("relationshipMatrix").innerHTML = "";
    document.getElementById("contestantsList").innerHTML = "";

    // 🧼 Botão de simular episódio
    const simulateBtn = document.getElementById("simulateBtn");
    if (simulateBtn) simulateBtn.disabled = false;

    // 🔙 Mostra painel principal
    document.getElementById("scaleWrapper").style.display = "block";
    document.getElementById("simulator").style.display = "none";

    // ✅ Garante que os elementos do painel inicial estão visíveis
    const formatGrid = document.querySelector(".format-grid");
    const setupPanel = document.querySelector(".queen-setup-panel");
    if (formatGrid) formatGrid.style.display = "flex";
    if (setupPanel) setupPanel.style.display = "block";

    // 🎯 Painéis relacionados
    document.getElementById("endSeasonBtn").style.display = "none";
    document.getElementById("importMenu").style.display = "none";
    document.getElementById("createQueenPanel").classList.add("hidden");
    document.getElementById("relationshipEditor").classList.add("hidden");

    // 📦 Restaura a grid de queens
    const list = document.getElementById("contestantsList");
    list.style.display = "flex";
    list.classList.add("contestant-grid");

    // 🔘 Botões de controle
    const buttonGroup = document.querySelector(".button-group");
    if (buttonGroup) buttonGroup.style.display = "flex";

    // 🛡️ Botão de imunidade
    const btn = document.getElementById("enableImmunityBtn");
    if (btn) btn.innerText = "🛡️ Immunity: OFF";

    // ✅ Restaura botões de seleção de formato
    document.getElementById("btn-regular")?.classList.add("selected");
    document.getElementById("btn-allstars")?.classList.remove("selected");
    document.getElementById("btn-normal")?.classList.add("selected");
    document.getElementById("btn-slayers")?.classList.remove("selected");

    // 🧮 Atualiza contador de queens e lista
    if (typeof updateQueenCount === "function") updateQueenCount();
    if (typeof updateContestantsList === "function") updateContestantsList(); // ✅ Essencial para evitar duplicatas após reset
}

document.getElementById('createQueenBtn').addEventListener('click', () => {
    document.getElementById('createQueenPanel').classList.remove('hidden');
});

function calculateStoryline(name) {
    const record = trackRecord[name];
    if (!record) return 0;

    let points = 0;
    const weights = {
        WIN: 4,
        HIGH: 2,
        LOW: 1.5,
        BTM: 2.5,
        SAFE: 0.3,
    };

    record.forEach(res => {
        if (weights[res]) {
            points += weights[res];
        }
    });

    return points / record.length;
}

function decideElimination(q1, q2) {
    function score(queen) {
        const lipsync = queen.lipsync;
        const wins = trackRecord[queen.name].filter(r => r === "WIN").length;
        const btms = trackRecord[queen.name].filter(r => r === "BTM").length;
        const ppe = calculatePPE(queen.name);
        const storyline = calculateStoryline(queen.name);

        // ❗ PENALIZA fortemente múltiplos BTM
        const btmPenalty = btms >= 3 ? -5 : -1.5 * btms;

        return (lipsync * 1.8) + (ppe * 2) + (storyline * 1.5) + (wins * 2.5) + btmPenalty;
    }

    const wins1 = trackRecord[q1.name].filter(r => r === "WIN").length;
    const wins2 = trackRecord[q2.name].filter(r => r === "WIN").length;
    const btms1 = trackRecord[q1.name].filter(r => r === "BTM").length;
    const btms2 = trackRecord[q2.name].filter(r => r === "BTM").length;
    const ppe1 = calculatePPE(q1.name);
    const ppe2 = calculatePPE(q2.name);

    const protected1 = wins1 >= 3 && btms1 < 4;
    const protected2 = wins2 >= 3 && btms2 < 4;

    // 🟣 Double Shantay obrigatório se ambas têm PPE ótimo
    if (ppe1 >= 7 && ppe2 >= 7) {
        doubleShantay = true;
        return null;
    }

    // 🔰 Proteção total para queens com 3+ wins
    if (protected1 && !protected2) return q2;
    if (protected2 && !protected1) return q1;

    // 🔥 Eliminação automática se passou do limite de BTM
    if (btms1 >= 4 && btms2 < 4) return q1;
    if (btms2 >= 4 && btms1 < 4) return q2;
    if (btms1 >= 4 && btms2 >= 4) {
        const score1 = score(q1);
        const score2 = score(q2);
        return score1 < score2 ? q1 : q2;
    }

    // ✅ Queen com WIN vs queen sem WIN
    if (wins1 > 0 && wins2 === 0 && btms1 < 4) {
        const diff = wins1 - wins2;
        const base = 0.7 + diff * 0.1 - (ppe2 - ppe1) * 0.05;
        if (Math.random() < Math.min(Math.max(base, 0.4), 0.95)) return q2;
    }
    if (wins2 > 0 && wins1 === 0 && btms2 < 4) {
        const diff = wins2 - wins1;
        const base = 0.7 + diff * 0.1 - (ppe1 - ppe2) * 0.05;
        if (Math.random() < Math.min(Math.max(base, 0.4), 0.95)) return q1;
    }

    const score1 = score(q1);
    const score2 = score(q2);

    // 🌟 Double Shantay se ambas foram boas e é disputa acirrada
    const bothStrong = wins1 >= 2 && wins2 >= 2 && (ppe1 + ppe2) / 2 >= 5;
    const closeCall = Math.abs(score1 - score2) < 2;
    const noFlop = !["BTM", "ELIM"].includes(trackRecord[q1.name].at(-1)) &&
        !["BTM", "ELIM"].includes(trackRecord[q2.name].at(-1));

    if (bothStrong && closeCall && noFlop && !doubleShantayUsed) {
        doubleShantay = true;
        doubleShantayUsed = true;
        return null;
    }

    return score1 < score2 ? q1 : q2;
}

function toggleImmunity() {
    const btn = document.getElementById("enableImmunityBtn");
    immunityEnabled = !immunityEnabled;

    if (immunityEnabled) {
        btn.innerText = "🛡️ Immunity: ON";
        btn.classList.add("selected-immunity");
    } else {
        btn.innerText = "🛡️ Immunity: OFF";
        btn.classList.remove("selected-immunity");
    }
}

function decideEliminationWithCustomRecord(q1, q2, customTrack) {
    function score(queen) {
        const lipsync = queen.lipsync;
        const wins = customTrack[queen.name].filter(r => r === "WIN").length;
        const btms = customTrack[queen.name].filter(r => r === "BTM").length;
        const ppe = calculatePPE(queen.name);
        const storyline = calculateStoryline(queen.name);

        const btmPenalty = btms >= 3 ? -3 : -1 * btms;
        return (lipsync * 1.5) + (ppe * 2) + (storyline * 1.5) + (wins * 2) + btmPenalty;
    }

    const wins1 = customTrack[q1.name].filter(r => r === "WIN").length;
    const wins2 = customTrack[q2.name].filter(r => r === "WIN").length;
    const btms1 = customTrack[q1.name].filter(r => r === "BTM").length;
    const btms2 = customTrack[q2.name].filter(r => r === "BTM").length;
    const ppe1 = calculatePPE(q1.name);
    const ppe2 = calculatePPE(q2.name);

    // 🛡️ Proteção precoce para boas queens
    const earlyProtect1 = wins1 >= 1 && ppe1 >= 4.5 && trackRecord[q1.name].length <= 4;
    const earlyProtect2 = wins2 >= 1 && ppe2 >= 4.5 && trackRecord[q2.name].length <= 4;
    if (earlyProtect1 && !earlyProtect2) return q2;
    if (earlyProtect2 && !earlyProtect1) return q1;

    const protected1 = wins1 >= 3 && btms1 < 4;
    const protected2 = wins2 >= 3 && btms2 < 4;

    // 🟣 Double Shantay se ambas são ótimas
    if (ppe1 >= 7 && ppe2 >= 7) {
        doubleShantay = true;
        return null;
    }

    // 🔒 Proteção por vitórias
    if (protected1 && !protected2) return q2;
    if (protected2 && !protected1) return q1;

    // 💣 Autoeliminação por muitos BTMs
    if (btms1 >= 4 && btms2 < 4) return q1;
    if (btms2 >= 4 && btms1 < 4) return q2;
    if (btms1 >= 4 && btms2 >= 4) {
        const score1 = score(q1);
        const score2 = score(q2);
        return score1 < score2 ? q1 : q2;
    }

    // ⚠️ Protege queens com 2+ wins contra queens sem nenhuma (caso Vanush)
    if (wins1 >= 2 && wins2 === 0 && btms1 < 4) {
        const winGap = wins1 - wins2;
        const dominance = ppe1 - ppe2;
        if (winGap >= 2 && dominance >= 1.5) return q2;

        let baseChance = 0.9 - 0.1 * dominance;
        if (Math.random() < baseChance) return q2;
    }

    if (wins2 >= 2 && wins1 === 0 && btms2 < 4) {
        const winGap = wins2 - wins1;
        const dominance = ppe2 - ppe1;
        if (winGap >= 2 && dominance >= 1.5) return q1;

        let baseChance = 0.9 - 0.1 * dominance;
        if (Math.random() < baseChance) return q1;
    }

    const score1 = score(q1);
    const score2 = score(q2);

    // 🌟 Double shantay se ambas são fortes e desempenho similar
    const bothStrong = wins1 >= 2 && wins2 >= 2;
    const noRecentFlop =
        !["BTM", "ELIM"].includes(customTrack[q1.name].at(-1)) &&
        !["BTM", "ELIM"].includes(customTrack[q2.name].at(-1));
    const closeScore = Math.abs(score1 - score2) < 2;

    if (bothStrong && closeScore && noRecentFlop) {
        doubleShantay = true;
        return null;
    }

    return score1 < score2 ? q1 : q2;
}

window.openImportMenu = openImportMenu;
window.closeImportMenu = closeImportMenu;
window.importQueen = importQueen;

function simulateLipsync(q1, q2) {
    const s1 = q1.lipsync + Math.random() * 5;
    const s2 = q2.lipsync + Math.random() * 5;
    return s1 >= s2 ? q1 : q2;
}

function chooseElimination(decider, candidates) {
    const scored = candidates.map(q => {
        const ppe = calculatePPE(q.name); // 0 a 10
        const relationship = getRelationship(decider, q); // 0 a 100
        const storyline = storylineScore(q.name); // até ~3 * episódios

        const normPPE = 1 - (ppe / 15);
        const normRel = 1 - (relationship / 100);
        const normStory = 1 - (storyline / (episodeCount * 3));

        const rec = trackRecord[q.name] || [];
        const hasHighlight = rec.includes("WIN") || rec.includes("TOP2");

        let rawPerfWeight = 0;
        if (!hasHighlight && episodeCount <= 3 && storyline < episodeCount * 1.2 && ppe < 6) {
            rawPerfWeight = (1 - (q.score / 10)) * 0.3;
        }

        return {
            queen: q,
            relationship,
            scoreFinal:
                (normPPE * 0.5) +   // novo peso PPE
                (normRel * 0.25) +  // novo peso relação
                (normStory * 0.05) +
                rawPerfWeight
        };
    });

    scored.sort((a, b) => b.scoreFinal - a.scoreFinal); // maior = pior

    const closeFriend = scored.find(s => s.relationship >= 70);
    if (closeFriend) {
        const chanceToSave = (closeFriend.relationship - 60) / 50;
        if (Math.random() < chanceToSave) {
            const toEliminate = scored.find(s => s.queen.name !== closeFriend.queen.name);
            if (toEliminate) return toEliminate.queen;
        }
    }

    return scored[0].queen;
}

function reduceRelationship(nameA, nameB, amount) {
    const queenA = queens.find(q => q.name === nameA);
    const queenB = queens.find(q => q.name === nameB);
    if (!queenA || !queenB) return;

    if (!queenA.relationships) queenA.relationships = {};
    if (!queenA.relationships[nameB]) queenA.relationships[nameB] = 0;

    queenA.relationships[nameB] -= amount;

    // Limite mínimo
    if (queenA.relationships[nameB] < -50) {
        queenA.relationships[nameB] = -50;
    }
}

function toggleResults(button) {
    const container = button.previousElementSibling;
    if (!container) return;

    const isHidden = container.style.display === "none" || container.style.display === "";

    if (isHidden) {
        container.style.display = "block";
        button.innerText = "🙈 Hide Official Results";
    } else {
        container.style.display = "none";
        button.innerText = "👁 Show Official Results";
    }
}

function openRelationshipEditor() {
    if (episodeCount > 1) {
        alert("⚠️ Relationships can only be edited before the season starts.");
        return;
    }

    const selector = document.getElementById("queenSelector");
    selector.innerHTML = "<option value=''>Select a Queen</option>";

    for (const q of queens) {
        const opt = document.createElement("option");
        opt.value = q.name;
        opt.textContent = q.name;
        selector.appendChild(opt);
    }

    document.getElementById("relationshipEditMatrix").innerHTML = "";
    document.getElementById("relationshipEditor").classList.remove("hidden");
}

function closeRelationshipEditor() {
    document.getElementById("relationshipEditor").classList.add("hidden");
}

function saveRelationships() {
    const selectedName = document.getElementById("queenSelector").value;
    const q1 = queens.find(q => q.name === selectedName);
    if (!q1) return;

    for (const q2 of queens) {
        if (q1.name !== q2.name) {
            const key = `${q1.name}_${q2.name}`;
            const input = document.getElementById(`num_${key}`);
            if (input) {
                if (!q1.relationships) q1.relationships = {};
                q1.relationships[q2.name] = parseInt(input.value);
            }
        }
    }

    alert(`✅ Relationships for ${q1.name} saved!`);
}

function renderRelationshipsFor(name) {
    const matrix = document.getElementById("relationshipEditMatrix");
    matrix.innerHTML = "";

    const selectedQueen = queens.find(q => q.name === name);
    if (!selectedQueen) return;

    for (const q of queens) {
        if (q.name !== selectedQueen.name) {
            const key = `${selectedQueen.name}_${q.name}`;
            const existing = selectedQueen.relationships?.[q.name] ?? 0;

            const row = document.createElement("div");
            row.className = "relationship-row";
            row.innerHTML = `
        <label for="num_${key}">${q.name}</label>
        <input type="range" id="num_${key}" min="0" max="100" value="${existing}" oninput="this.nextElementSibling.value = this.value">
        <output>${existing}</output>
      `;
            matrix.appendChild(row);
        }
    }
}

window.randomizeQueen = randomizeQueen;
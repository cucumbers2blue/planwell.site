import { designFoundationsFileManagementDeck } from "./designFoundationsFileManagementDeck.ts";
import { hardwareSoftwareInputOutputDeck } from "./hardwareSoftwareInputOutputDeck.ts";
import { musicTaskAScoreSymbolsDeck } from "./musicTaskAScoreSymbolsDeck.ts";
import type { Deck, GradeLevel, Subject } from "./types";

export type { Card, Deck, GradeLevel, Subject } from "./types";

const designDecks: Deck[] = [
  {
    id: "digital-citizenship",
    title: "Digital Citizenship",
    description: "Digital footprints, privacy, passwords and respectful communication.",
    cards: [
      {
        question: "What does it mean to be a good digital citizen?",
        choices: [
          "Use technology safely, responsibly and kindly",
          "Spend as much time online as possible",
          "Know how to repair every computer",
        ],
        answer: "Use technology safely, responsibly and kindly",
        explanation:
          "A digital citizen is a person who uses digital technology and online spaces. Good digital citizens protect themselves, respect other people and think about the effects of what they do. Technical skill matters, but our choices and behaviour matter just as much.",
        discuss: "What is one online choice that can affect another person?",
      },
      {
        question: "What is a digital footprint?",
        choices: [
          "The trail of information created by online activity",
          "A password saved on one device",
          "A mark left by stepping on a computer",
        ],
        answer: "The trail of information created by online activity",
        explanation:
          "Posts, comments, searches, likes, photos and website visits can all become part of a digital footprint. Some information is shared deliberately, while other information is collected quietly by apps and websites. Together, these pieces can create a picture of a person's interests and behaviour.",
        discuss: "Which parts of your digital footprint do you control directly?",
      },
      {
        question: "Why can deleting a post fail to remove it completely?",
        choices: [
          "Other people may have saved, copied or shared it",
          "Every deleted post is printed automatically",
          "A post can only be deleted at school",
        ],
        answer: "Other people may have saved, copied or shared it",
        explanation:
          "Deleting the original removes it from one place, but it cannot remove screenshots, downloads, backups or copies shared elsewhere. This is why pausing before posting is more effective than trying to repair the situation afterwards. Ask: would I be comfortable if a teacher or family member saw this later?",
        discuss: "Is it fair to share a screenshot of someone else's message? Why or why not?",
      },
      {
        question: "Which information should normally stay private online?",
        choices: [
          "Your password, home address and live location",
          "Your favourite school subject",
          "The name of a book you enjoyed",
        ],
        answer: "Your password, home address and live location",
        explanation:
          "Private information can be used to identify you, find you or enter your accounts. A username or hobby may be safe in one situation but risky when combined with your full name, school and location. Privacy is not about hiding everything; it is about choosing carefully who receives personal information.",
        discuss: "How can several harmless details become risky when combined?",
      },
      {
        question: "What is netiquette?",
        choices: [
          "Respectful and responsible behaviour online",
          "A tool for catching weak internet signals",
          "A list of computer parts",
        ],
        answer: "Respectful and responsible behaviour online",
        explanation:
          "Netiquette means using good manners in digital communication. Written messages do not include facial expression or tone of voice, so jokes and short replies can be misunderstood. Clear, calm and respectful words help people communicate safely and solve disagreements.",
        discuss: "Why might the message “Fine.” sound different from the word spoken aloud?",
      },
      {
        question: "Which action adds to your digital footprint?",
        choices: ["Commenting on a video", "Closing your laptop", "Cleaning a keyboard"],
        answer: "Commenting on a video",
        explanation:
          "A comment connects words and activity to an account. It may remain searchable or visible after you have forgotten about it.",
      },
      {
        question: "Who might eventually see a public post?",
        choices: ["People beyond the intended audience", "Only the first viewer", "Nobody outside the app"],
        answer: "People beyond the intended audience",
        explanation:
          "Public information can be forwarded, copied or discovered through search. The original audience does not control where it travels next.",
      },
      {
        question: "What should you do before posting a photo of a friend?",
        choices: ["Ask for their permission", "Post first and ask later", "Add their address"],
        answer: "Ask for their permission",
        explanation:
          "The photo contributes to your friend's digital footprint as well as yours. Permission lets them make a choice about their own privacy.",
      },
      {
        question: "An app asks for your live location but does not need it. What is the safest choice?",
        choices: ["Do not allow location access", "Allow it forever", "Post the location publicly"],
        answer: "Do not allow location access",
        explanation:
          "Apps should only receive information needed for their purpose. Check with a trusted adult when a permission request is unclear.",
      },
      {
        question: "Which password is strongest?",
        choices: ["River!Planet84", "password", "12345678"],
        answer: "River!Planet84",
        explanation:
          "Long, unusual passwords are harder to guess. Avoid common patterns and personal facts such as names or birthdays.",
      },
      {
        question: "Why should different accounts use different passwords?",
        choices: ["One stolen password will not unlock everything", "It makes usernames shorter", "It charges the device faster"],
        answer: "One stolen password will not unlock everything",
        explanation:
          "Reusing a password turns one account breach into a risk for every account using the same password.",
      },
      {
        question: "A friend asks for your password. What should you do?",
        choices: ["Keep it private", "Share it for one day", "Send it in a group chat"],
        answer: "Keep it private",
        explanation:
          "Friends do not need access to your account. If you need help, speak to a trusted adult rather than sharing the password with friends.",
      },
      {
        question: "What is a useful extra protection after a password?",
        choices: ["Two-step verification", "A public profile", "The same password twice"],
        answer: "Two-step verification",
        explanation:
          "Two-step verification asks for another proof of identity. It can protect an account even when someone discovers the password.",
      },
      {
        question: "What should you do if you think your password was stolen?",
        choices: ["Change it and tell a trusted adult", "Ignore it", "Post the old password online"],
        answer: "Change it and tell a trusted adult",
        explanation:
          "Act quickly from a safe device. A trusted adult can help secure the account and check whether anything was changed.",
      },
      {
        question: "WRITING AN ENTIRE MESSAGE IN CAPITALS can seem like what?",
        choices: ["Shouting", "Whispering", "Pausing"],
        answer: "Shouting",
        explanation:
          "Capital letters are useful for emphasis, but a whole message in capitals can appear angry or aggressive.",
      },
      {
        question: "Why are online messages sometimes misunderstood?",
        choices: ["They may lack tone and facial expression", "Screens rearrange every sentence", "Readers cannot understand short words"],
        answer: "They may lack tone and facial expression",
        explanation:
          "Readers cannot always tell whether a message is serious, playful or annoyed. Clear wording and a pause before sending can prevent conflict.",
      },
      {
        question: "How should you disagree with someone online?",
        choices: ["Respond to the idea respectfully", "Insult the person", "Share their private information"],
        answer: "Respond to the idea respectfully",
        explanation:
          "People can disagree without attacking one another. Explain your reasoning and avoid comments about the person.",
      },
      {
        question: "You receive an unkind message. What is a good first response?",
        choices: ["Pause before replying", "Reply with something worse", "Forward it to embarrass the sender"],
        answer: "Pause before replying",
        explanation:
          "A fast, angry reply can make the situation worse. Pause, save evidence if necessary and ask a trusted adult for help.",
      },
      {
        question: "What should you do with a message that makes you feel unsafe?",
        choices: ["Save it and tell a trusted adult", "Meet the sender alone", "Delete it and tell nobody"],
        answer: "Save it and tell a trusted adult",
        explanation:
          "You do not have to manage an unsafe situation alone. Evidence can help a trusted adult understand what happened and support you.",
      },
      {
        question: "Someone online asks which school you attend. What is the safest response?",
        choices: ["Do not share it", "Send the full address", "Share your timetable too"],
        answer: "Do not share it",
        explanation:
          "Your school can reveal where you spend time and help identify you. Ask a trusted adult when someone requests personal details.",
      },
      {
        question: "A surprising message contains a link and asks you to log in. What should you do?",
        choices: ["Do not click; verify the message another way", "Enter your password quickly", "Forward it to everyone"],
        answer: "Do not click; verify the message another way",
        explanation:
          "Fake messages often create urgency to steal login details. Visit the service directly or ask the sender through a trusted channel.",
      },
      {
        question: "Which is an example of cyberbullying?",
        choices: ["Repeatedly sending cruel messages", "Politely disagreeing once", "Leaving a game to do homework"],
        answer: "Repeatedly sending cruel messages",
        explanation:
          "Cyberbullying uses digital communication to harm, embarrass or exclude someone. Report it and seek help rather than joining in.",
      },
      {
        question: "A class group chat shares an embarrassing photo of a student. What should you do?",
        choices: ["Do not reshare it and tell a trusted adult", "Add a joke", "Save it to post later"],
        answer: "Do not reshare it and tell a trusted adult",
        explanation:
          "Not forwarding harmful content stops it spreading further. Getting help supports the person affected and allows adults to respond.",
      },
      {
        question: "Which question is most useful before posting?",
        choices: ["Is it true, necessary and kind?", "Will it get attention?", "Can I type it faster?"],
        answer: "Is it true, necessary and kind?",
        explanation:
          "A short check helps prevent misinformation, oversharing and unkind communication. If uncertain, wait before posting.",
      },
      {
        question: "Which choice best protects your online reputation?",
        choices: ["Pause and consider the future audience", "Assume deleted posts vanish forever", "Let friends post from your account"],
        answer: "Pause and consider the future audience",
        explanation:
          "An online reputation develops over time from many small choices. Post things you would be comfortable explaining later.",
      },
    ],
  },
  hardwareSoftwareInputOutputDeck,
  designFoundationsFileManagementDeck,
];

export const subjects: Subject[] = [
  {
    id: "design",
    title: "Design",
    mark: "D6",
    description: "Grade 6 Design topics for learning, discussion and practice.",
    decks: designDecks,
  },
  {
    id: "music",
    title: "Music",
    mark: "M6",
    description: "Grade 6 Music topics, starting with reading a piano score.",
    decks: [musicTaskAScoreSymbolsDeck],
  },
];

export const grades: GradeLevel[] = [
  {
    id: "grade-6",
    title: "Grade 6",
    mark: "G6",
    description: "Music and Design topics for Grade 6.",
    subjects,
  },
];

/** @deprecated Prefer subjects; kept for older imports/tests. */
export const decks: Deck[] = designDecks;

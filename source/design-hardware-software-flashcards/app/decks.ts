export type Card = {
  id: number;
  question: string;
  choices: string[];
  answer: string;
  deeper: string;
  discussion?: string[];
};

export type Deck = {
  id: "basics" | "applying" | "input-output";
  number: string;
  title: string;
  description: string;
  accent: string;
  introCount?: number;
  cards: Card[];
};

export const decks: Deck[] = [
  {
    id: "basics",
    number: "01",
    title: "Hardware and Software Basics",
    description:
      "Build the foundation: definitions, examples and the essential difference.",
    accent: "cyan",
    cards: [
      {
        id: 1,
        question: "What is hardware?",
        choices: ["Physical computer parts", "Programs", "Websites"],
        answer: "Physical computer parts",
        deeper:
          "Hardware includes external devices such as keyboards and monitors, but also internal parts such as the processor, memory and storage drive.",
      },
      {
        id: 2,
        question: "What is software?",
        choices: ["Programs and instructions", "Computer parts", "Wires"],
        answer: "Programs and instructions",
        deeper:
          "Software tells the hardware what to do. Operating systems manage the computer, while applications help users perform particular tasks.",
      },
      {
        id: 3,
        question: "Which item is hardware?",
        choices: ["Keyboard", "Google Chrome", "PowerPoint"],
        answer: "Keyboard",
        deeper:
          "A keyboard converts each key press into an electronic signal that the computer can understand.",
      },
      {
        id: 4,
        question: "Which item is software?",
        choices: ["Monitor", "Mouse", "Microsoft Word"],
        answer: "Microsoft Word",
        deeper:
          "Word is application software designed for creating documents. It relies on the operating system and physical computer to work.",
      },
      {
        id: 5,
        question: "Is a printer hardware or software?",
        choices: ["Hardware", "Software"],
        answer: "Hardware",
        deeper:
          "A printer is a physical output device. It also needs software called a printer driver to communicate with the computer.",
      },
      {
        id: 6,
        question: "Is a computer game hardware or software?",
        choices: ["Hardware", "Software"],
        answer: "Software",
        deeper:
          "The game contains programmed rules, instructions, images and sounds. It needs hardware such as a processor, screen and controller to run.",
      },
      {
        id: 7,
        question: "Which can you physically touch?",
        choices: ["Hardware", "Software"],
        answer: "Hardware",
        deeper:
          "Some hardware is easy to see, while other components are hidden inside the computer case.",
      },
      {
        id: 8,
        question: "Which item is software?",
        choices: ["Laptop", "Windows", "Speaker"],
        answer: "Windows",
        deeper:
          "Windows is an operating system. It manages the computer’s hardware and provides a platform for applications to run.",
      },
      {
        id: 9,
        question: "Which item is hardware?",
        choices: ["YouTube", "Keyboard", "Google Docs"],
        answer: "Keyboard",
        deeper:
          "YouTube and Google Docs are software services accessed through a browser. The keyboard is a physical device used to control them.",
      },
      {
        id: 10,
        question: "What gives hardware instructions?",
        choices: ["Software", "Electricity", "The desk"],
        answer: "Software",
        deeper:
          "The processor follows software instructions to perform calculations and control other components. Hardware without software has nothing useful to execute.",
      },
    ],
  },
  {
    id: "applying",
    number: "02",
    title: "Applying the Idea",
    description:
      "Use what you know: classify combinations, situations and simple problems.",
    accent: "orange",
    cards: [
      {
        id: 1,
        question:
          "A student types in Microsoft Word. Which item is hardware?",
        choices: ["Keyboard", "Microsoft Word", "Document"],
        answer: "Keyboard",
        deeper:
          "Pressing a key closes a small electronic circuit. The keyboard sends a code representing that key to the computer.",
      },
      {
        id: 2,
        question:
          "A student types in Microsoft Word. Which item is software?",
        choices: ["Keyboard", "Microsoft Word", "Screen"],
        answer: "Microsoft Word",
        deeper:
          "Word interprets the keyboard signals and displays the corresponding letters. The hardware and software work together.",
      },
      {
        id: 3,
        question: "Which pair contains only hardware?",
        choices: [
          "Mouse and monitor",
          "Chrome and Word",
          "Keyboard and PowerPoint",
        ],
        answer: "Mouse and monitor",
        deeper:
          "Both are physical devices, but they perform different jobs. The mouse sends information into the system, while the monitor presents information to the user.",
      },
      {
        id: 4,
        question: "Which pair contains only software?",
        choices: [
          "Chrome and PowerPoint",
          "Mouse and printer",
          "Screen and Windows",
        ],
        answer: "Chrome and PowerPoint",
        deeper:
          "Chrome is designed for accessing websites, while PowerPoint is designed for presentations. Different software is created for different purposes.",
      },
      {
        id: 5,
        question:
          "Which pair contains one hardware item and one software item?",
        choices: [
          "Keyboard and Chrome",
          "Mouse and printer",
          "Word and PowerPoint",
        ],
        answer: "Keyboard and Chrome",
        deeper:
          "The keyboard provides physical controls, while Chrome interprets the user’s actions and communicates with websites.",
      },
      {
        id: 6,
        question: "Which part displays a computer game?",
        choices: ["Monitor", "Game software", "Keyboard"],
        answer: "Monitor",
        deeper:
          "A monitor creates an image using thousands or millions of tiny pixels. The computer sends instructions describing the colour of every pixel.",
      },
      {
        id: 7,
        question:
          "Which item contains the instructions for a computer game?",
        choices: ["Game software", "Monitor", "Mouse"],
        answer: "Game software",
        deeper:
          "Game software stores rules such as movement, scoring and what happens when objects interact. The processor executes these instructions.",
      },
      {
        id: 8,
        question:
          "The screen is cracked. Is this a hardware or software problem?",
        choices: ["Hardware", "Software"],
        answer: "Hardware",
        deeper:
          "Physical damage requires repairing or replacing the affected component. Installing new software cannot repair broken glass.",
      },
      {
        id: 9,
        question:
          "An application freezes. Is this probably a hardware or software problem?",
        choices: ["Hardware", "Software"],
        answer: "Software",
        deeper:
          "The program may have encountered an error or become unable to complete an instruction. However, weak or failing hardware can sometimes cause similar symptoms.",
      },
      {
        id: 10,
        question: "Why does a computer need hardware and software?",
        choices: [
          "Hardware runs instructions provided by software",
          "They are the same thing",
          "Software can work without a device",
        ],
        answer: "Hardware runs instructions provided by software",
        deeper:
          "A useful computer system requires both. Software provides instructions, while hardware performs calculations, stores information and communicates with the user.",
      },
    ],
  },
  {
    id: "input-output",
    number: "03",
    title: "Input and Output Devices",
    description:
      "Learn the key ideas first, then practise with devices and real situations.",
    accent: "green",
    introCount: 8,
    cards: [
      {
        id: 1,
        question: "What is hardware?",
        choices: ["The physical parts of a computer", "Programs and instructions", "Information on a website"],
        answer: "The physical parts of a computer",
        deeper:
          "Hardware is every physical part of a computer system. You can touch devices such as a keyboard, monitor, printer and mouse. Parts hidden inside the computer are hardware too.",
        discussion: [
          "Which hardware devices can you see in this room?",
          "Which hardware parts might be hidden inside a laptop?",
        ],
      },
      {
        id: 2,
        question: "What is software?",
        choices: ["Parts made from metal and plastic", "Programs and instructions that run on hardware", "Only files saved online"],
        answer: "Programs and instructions that run on hardware",
        deeper:
          "Software is not a physical object. It includes operating systems and applications. Software gives instructions, and the hardware carries out those instructions.",
        discussion: [
          "Which software did you use today?",
          "Could useful software run without any hardware? Why not?",
        ],
      },
      {
        id: 3,
        question: "What is an input device?",
        choices: ["A device that shows information", "A program that saves information", "Hardware used to send data into a computer"],
        answer: "Hardware used to send data into a computer",
        deeper:
          "An input device sends data or commands into a computer system. A keyboard sends key presses, a mouse sends movement and clicks, and a microphone sends sound.",
        discussion: [
          "What information does a keyboard send into a computer?",
          "How does a game controller give input?",
        ],
      },
      {
        id: 4,
        question: "What is an output device?",
        choices: ["Hardware used by a computer to present information", "Hardware used only to type words", "Software used to control a computer"],
        answer: "Hardware used by a computer to present information",
        deeper:
          "An output device presents information from the computer to a user. A monitor shows images, speakers play sound, and a printer produces a paper copy.",
        discussion: [
          "What output do speakers produce?",
          "Why is a printer an output device?",
        ],
      },
      {
        id: 5,
        question: "What is the main difference between input and output?",
        choices: ["Input is software; output is hardware", "Input sends data in; output presents information out", "Input is always wireless; output always uses cables"],
        answer: "Input sends data in; output presents information out",
        deeper:
          "Think about the direction of information. Input travels from the user or environment into the computer. Output travels from the computer to the user.",
        discussion: [
          "When you type a letter and see it appear, what is the input and what is the output?",
          "Can you describe another input-to-output example?",
        ],
      },
      {
        id: 6,
        question: "Which sequence best describes a simple computer system?",
        choices: ["Output → input → software", "Hardware → electricity → internet", "Input → processing → output"],
        answer: "Input → processing → output",
        deeper:
          "A computer receives input, processes the data by following software instructions, and produces output. For example, a calculator receives numbers, calculates, and displays an answer.",
        discussion: [
          "What happens between pressing a key and seeing a letter?",
          "Where does software fit into this sequence?",
        ],
      },
      {
        id: 7,
        question: "Can one device be both input and output?",
        choices: ["Yes, a touchscreen can do both", "No, every device has only one role", "Only software can do both"],
        answer: "Yes, a touchscreen can do both",
        deeper:
          "A touchscreen gives output by displaying images and receives input when a user taps or swipes. Its role depends on the direction in which information is moving.",
        discussion: [
          "How does a touchscreen receive input?",
          "How does the same screen provide output?",
        ],
      },
      {
        id: 8,
        question: "How do hardware and software work together?",
        choices: ["They work separately and never communicate", "Software gives instructions and hardware carries them out", "Hardware creates all software by itself"],
        answer: "Software gives instructions and hardware carries them out",
        deeper:
          "When you record your voice, recording software tells the microphone and other hardware what to do. The program then uses output hardware, such as speakers, to play the recording.",
        discussion: [
          "What hardware and software work together when you watch a video?",
          "What would happen if the hardware worked but the software did not?",
        ],
      },
      {
        id: 9,
        question: "Which device is mainly used for input?",
        choices: ["Printer", "Monitor", "Keyboard"],
        answer: "Keyboard",
        deeper:
          "A keyboard sends letters, numbers and commands into the computer. The printer and monitor mainly present output from the computer.",
      },
      {
        id: 10,
        question: "Which device is mainly used for output?",
        choices: ["Monitor", "Mouse", "Microphone"],
        answer: "Monitor",
        deeper:
          "A monitor receives visual information from the computer and displays it as text, pictures and video for the user.",
      },
      {
        id: 11,
        question: "A mouse is which type of device?",
        choices: ["Output device", "Input device", "Software"],
        answer: "Input device",
        deeper:
          "A mouse sends movement, clicks and scrolling commands into the computer. It controls what happens but does not present the result.",
      },
      {
        id: 12,
        question: "A printer is which type of device?",
        choices: ["Input device", "Application software", "Output device"],
        answer: "Output device",
        deeper:
          "A printer receives information from the computer and produces a physical copy on paper. This is called hard-copy output.",
      },
      {
        id: 13,
        question: "Which device sends sound into a computer?",
        choices: ["Microphone", "Speaker", "Projector"],
        answer: "Microphone",
        deeper:
          "A microphone changes sound waves into data that a computer can record or process. This makes it an input device.",
      },
      {
        id: 14,
        question: "Which device plays sound from a computer?",
        choices: ["Scanner", "Speakers", "Keyboard"],
        answer: "Speakers",
        deeper:
          "Speakers receive audio data from the computer and turn it into sound waves that people can hear, so they provide output.",
      },
      {
        id: 15,
        question: "Which device copies a paper image into a computer?",
        choices: ["Printer", "Monitor", "Scanner"],
        answer: "Scanner",
        deeper:
          "A scanner captures text or pictures from paper and sends the digital data into the computer. It is an input device.",
      },
      {
        id: 16,
        question: "Which device shows a computer image on a large wall or screen?",
        choices: ["Projector", "Webcam", "Joystick"],
        answer: "Projector",
        deeper:
          "A projector receives visual information from a computer and displays a larger image for an audience. It is an output device.",
      },
      {
        id: 17,
        question: "A webcam is mainly which type of device?",
        choices: ["Output device", "Input device", "Operating system"],
        answer: "Input device",
        deeper:
          "A webcam captures images and video from the world and sends them into the computer for video calls, recording or analysis.",
      },
      {
        id: 18,
        question: "Headphones are mainly which type of device?",
        choices: ["Input device", "Software", "Output device"],
        answer: "Output device",
        deeper:
          "Headphones receive sound information from a computer and present it to the listener. They perform the same output role as speakers.",
      },
      {
        id: 19,
        question: "Which device can provide both input and output?",
        choices: ["Touchscreen", "Basic keyboard", "Printer"],
        answer: "Touchscreen",
        deeper:
          "A touchscreen displays visual output and also detects taps and swipes as input. One physical device can therefore have two roles.",
      },
      {
        id: 20,
        question: "A game controller is mainly which type of device?",
        choices: ["Output device", "Input device", "Application software"],
        answer: "Input device",
        deeper:
          "Buttons and joysticks send the player’s actions into the game. The game then processes those actions and produces visual and sound output.",
      },
      {
        id: 21,
        question: "Which item is software?",
        choices: ["Monitor", "Keyboard", "Google Chrome"],
        answer: "Google Chrome",
        deeper:
          "Google Chrome is a browser program. It uses hardware such as the keyboard, mouse and screen, but the program itself is software.",
      },
      {
        id: 22,
        question: "A laptop screen is physically cracked. What type of problem is this?",
        choices: ["Hardware problem", "Software problem", "Input problem"],
        answer: "Hardware problem",
        deeper:
          "The screen is a physical component, so cracks and other physical damage are hardware problems that require repair or replacement.",
      },
      {
        id: 23,
        question: "A class sees presentation slides on the wall. What device gives the output?",
        choices: ["Mouse", "Projector", "Microphone"],
        answer: "Projector",
        deeper:
          "The projector receives the presentation image from the computer and displays it for the class, making it the output device.",
      },
      {
        id: 24,
        question: "A student records a voice message. Which device provides the input?",
        choices: ["Speaker", "Monitor", "Microphone"],
        answer: "Microphone",
        deeper:
          "The microphone captures the student’s voice and sends it into the computer. Speakers would provide output when the message is played.",
      },
      {
        id: 25,
        question: "A student clicks an icon. Which device sends that command into the computer?",
        choices: ["Mouse", "Printer", "Monitor"],
        answer: "Mouse",
        deeper:
          "The mouse detects movement and button presses, then sends those commands into the computer as input for software to process.",
      },
      {
        id: 26,
        question: "A computer shows a photograph. Which device provides the visual output?",
        choices: ["Scanner", "Monitor", "Keyboard"],
        answer: "Monitor",
        deeper:
          "The monitor receives image data from the computer and presents the photograph to the user as visual output.",
      },
      {
        id: 27,
        question: "A student scans a drawing. What happens first?",
        choices: ["The printer produces output", "The speakers play sound", "The scanner sends image data into the computer"],
        answer: "The scanner sends image data into the computer",
        deeper:
          "The scanner is the input device. After the image enters the computer, software can process, save, edit or display it.",
      },
      {
        id: 28,
        question: "Why is a drawing app software rather than hardware?",
        choices: ["It is a program made of instructions", "It is connected with a cable", "It can be held in your hand"],
        answer: "It is a program made of instructions",
        deeper:
          "A drawing app is a set of instructions that runs on physical hardware. The screen and stylus are hardware, while the app is software.",
      },
      {
        id: 29,
        question: "Why might a printer need a driver?",
        choices: ["To turn it into an input device", "The software helps the computer communicate with the hardware", "To replace the paper"],
        answer: "The software helps the computer communicate with the hardware",
        deeper:
          "A driver is software that translates commands so the operating system and printer hardware can communicate correctly.",
      },
      {
        id: 30,
        question: "Which statement best explains input and output?",
        choices: ["Both words mean software", "Input always uses a keyboard and output always uses a screen", "Input sends data to a computer; output presents results from it"],
        answer: "Input sends data to a computer; output presents results from it",
        deeper:
          "Input and output describe the direction of information, not one particular device. Many different devices can send data in or present information out.",
      },
    ],
  },
];

export const inputOutputDeck = decks[2];

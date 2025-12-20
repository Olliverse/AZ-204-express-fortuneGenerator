// Templates for generating misfortunes
const misfortuneTemplates = [
    "You ignored a stranger's advice about {topic}",
    "You chose convenience over wisdom regarding {topic}",
    "A forgotten dream warned you about {topic}",
    "You dismissed your intuition concerning {topic}",
    "An ancestor's curse manifested through {topic}",
    "You broke a minor social contract involving {topic}",
    "The universe sent three signs about {topic}, you missed them all",
    "A butterfly effect originated from your decision about {topic}",
    "You angered a minor deity responsible for {topic}",
    "Mercury was in retrograde when you dealt with {topic}",
    "You skipped reading the terms and conditions about {topic}",
    "A parallel universe version of you made better choices with {topic}",
    "You spilled salt and didn't throw it over your shoulder before {topic}",
    "The algorithm predicted this outcome from your behavior with {topic}",
    "A black cat crossed your path moments before you handled {topic}"
];

const contextKeywords = {
    work: ['career decisions', 'office politics', 'email etiquette', 'meeting attendance', 'deadline management'],
    love: ['text message timing', 'emotional availability', 'gift selection', 'anniversary remembrance', 'listening skills'],
    money: ['investment choices', 'impulse purchases', 'subscription management', 'receipt keeping', 'budget adherence'],
    health: ['sleep schedules', 'hydration habits', 'posture awareness', 'exercise consistency', 'meal planning'],
    social: ['party attendance', 'friend zones', 'social media posts', 'group chat responses', 'birthday remembering'],
    general: ['life choices', 'daily routines', 'risk assessment', 'priority setting', 'self-care']
};

function extractTopic(situation) {
    const lower = situation.toLowerCase();

    for (const [category, topics] of Object.entries(contextKeywords)) {
        for (const topic of topics) {
            if (lower.includes(topic.split(' ')[0])) {
                return topics[Math.floor(Math.random() * topics.length)];
            }
        }
    }

    // Fallback: use general topics
    return contextKeywords.general[Math.floor(Math.random() * contextKeywords.general.length)];
}

function generateLuckyNumbers(situation) {
    // Generate 6 "lucky" numbers based on situation
    const numbers = [];
    const seed = situation.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    for (let i = 0; i < 6; i++) {
        numbers.push(((seed * (i + 1) * 17) % 99) + 1);
    }

    return numbers.sort((a, b) => a - b);
}

function calculatePreventability(situation) {
    // Pseudo-scientific calculation of preventability
    const vowels = (situation.match(/[aeiou]/gi) || []).length;
    const words = situation.trim().split(/\s+/).length;
    const exclamations = (situation.match(/[!?]/g) || []).length;

    const score = Math.min(99, Math.max(1,
        (vowels * 7 + words * 3 + exclamations * 11) % 100
    ));

    return score;
}

function generateMisfortune(situation) {
    const template = misfortuneTemplates[Math.floor(Math.random() * misfortuneTemplates.length)];
    const topic = extractTopic(situation);
    const misfortune = template.replace('{topic}', topic);
    const luckyNumbers = generateLuckyNumbers(situation);
    const preventability = calculatePreventability(situation);

    return {
        situation: situation,
        misfortune: misfortune,
        luckyNumbers: luckyNumbers,
        preventability: preventability,
        interpretation: `There was a ${preventability}% chance this could have been prevented.`
    };
}

module.exports = {
    generateMisfortune
};
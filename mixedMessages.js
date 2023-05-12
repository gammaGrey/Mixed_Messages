/* MIXED MESSAGES
 # OUTLINE
    * [works] User runs script.js
    * [works] generateMessage() generates a random message from an object
    * [works] Object contains {phrases} which are filled with randomly selected words/phrases
    * [to-do] Make sentences extendable with extra phrases
    * [to-do] Add sentences that use:
                * verbBank
                * adverbBank
                * connectiveBank
                    * Add randomisation to which type of connective is returned
    * [to-do] Add second mad lib array to extend message diversity
    * [to-do] Add setter/variable to store phraseBank.shape for a single message chain.

 # EXAMPLE MESSAGES
    * You have ${time} minutes to move your £{noun} or it will be crushed into a ${shape}.
    * You have ${time} minutes to move your ${shape}.
    * 
    * Your subcription to [Pizza] [is about to] [auto-renew].
    * Please get in touch with our [marketing] department to edit your subscription settings.
 */

//helper function for generating a random number. Returns 0 or 1 if no parameter is given.
const randNum = (x) => {
    if (!x) {
        x = 2
    };
        return Math.floor(Math.random()*x);
};

/* Object containing all of the possible  */
const phraseBank = {
    _shape: ["a cube","a sheet","a cylinder","an unrecognisable mess"],
    _verbBank: ["value","spend"],
    _adverbBank: ["quickly","unfortunately","thankfully","suddenly","strangely","obviously"],
    _titleBank: ["Ms","Mr","Mx","Mrs","Rev","Dr","Prof","Lord","Lady","Count","Countess","Duke","Duchess"],
    _properNounBank: {
        _firstName: ["Jeff","Dave","Wendy","Angelino","Benedict","Evelynn"],
        _lastName: ["Jefferson","Tatum","de Chavez","Kong","Cumberbatch","Grohnson"],
        _placeName: ["Paris","Lunar Base Delta-7","New York","Mumbai","Ohio","Northwest Yorkshire"],
    },
    _nounBank: {
        _noun: ["money","car","automatic delivery","subscription collection club","monthly tea box","taxidermy fish fan-fiction","FBI Caféteria Menu Archive"],
        _secondaryNoun: ["Pizza","Company","Production","Delivery","Stem Cell Research","Tea Enthusiast"],
        _companyType: ["Corporation","Institute","Company","Group","Collective","Society","Bank"],
        _accountName: ["Super Prime","Economy","Savings","VIP"],
        _accountType: ["Membership","Subscription","Lucky Dipper","Administrator","User","Power User"],
    },
    _adjectiveBank: ["valuable","important","inconsequential","impending","unfortunate","custom","special","secret","new"],
    _connectiveBank: {
        positive: ["and","also","additionally"],
        negative: ["but","however"],
        consequence: ["because of","due to","as a result of"],
    },
    _stateBank: {
        state1_1: "will",
        state2_1: ["expire","auto-renew",`be transferred to your`],
        state1_2: "has",
        state2_2: ["expired","auto-renewed",`been transferred to your`],
        state3: ["soon",`in`],
        state4: ["minutes","hours","days","weeks"],
    },
    //returns a number between 2-60
    _timeLimit() {
        return Math.floor(Math.random()*59) + 2;
    },
    get noun () {
        return this._nounBank._noun[Math.floor(Math.random()*this._nounBank._noun.length)];
    },
    get secNoun () {
        return this._nounBank._secondaryNoun[Math.floor(Math.random()*this._nounBank._secondaryNoun.length)];
    },
    get verb () {
        return this._verbBank[Math.floor(Math.random()*this._verbBank.length)];
    },
    get adverb () {
        return this._adverbBank[randNum(this._adverbBank.length)];
    },
    get title () {
        return this._titleBank[randNum(this._titleBank.length)]
    },
    get name () {
        let fullName = [];
        fullName.push(this._properNounBank._firstName[randNum(this._properNounBank._firstName.length)], this._properNounBank._lastName[randNum(this._properNounBank._lastName.length)]);
        return fullName.join(" ");
    },
    get adjective () {
        return this._adjectiveBank[randNum(this._adjectiveBank.length)];
    },
    get connective () {
        return this._connectiveBank[randNum(this._connectiveBank)];
    },
    get company () {
        return this._nounBank._companyType[randNum(this._nounBank._companyType.length)];
    },
    get shape () {
        return this._shape[randNum(this._shape.length)]
    },
    get state () {
        //generates random account type name
        const randAcc = () => {
            let account;
            let accountAdd = [];
            if (stat_2Seed === 2) {
                accountAdd.push(this._nounBank._accountName[randNum(this._nounBank._accountName.length)], this._nounBank._accountType[randNum(this._nounBank._accountType.length)], "account");
                account = accountAdd.join(" ");
                return stateArray.push(account);
            }
        };
        let msgSeed = randNum(3);
        let stat_2Seed = randNum(3);
        let stateArray = [];
        switch (msgSeed) {
            case 0: //TIME LIMIT
                stateArray.push(this._stateBank.state1_1, this._stateBank.state2_1[stat_2Seed]);
                randAcc();
                stateArray.push(this._stateBank.state3[1], this._timeLimit(), this._stateBank.state4[randNum(4)]);
                break;
            case 1: //"SOON"
                stateArray.push(this._stateBank.state1_1, this._stateBank.state2_1[stat_2Seed]);
                randAcc();
                stateArray.push(this._stateBank.state3[0]);
                break;
            case 2: //PAST TENSE
                stateArray.push(this._stateBank.state1_2, this._stateBank.state2_2[stat_2Seed]);
                randAcc();
                break;
            default:
                stateArray.push("UNEXPECTED ERROR. CHECK STATE GETTER");
                break;
        };
        return stateArray.join(" ");
    }
};

const greet = `For the attention of ${phraseBank.title} ${phraseBank.name}:`;
// Array of mad-lib-style messages that can be constructed with generateMessage()
const madLib = [
    `You have ${phraseBank._timeLimit()} ${phraseBank._stateBank.state4[randNum(4)]} to move your ${phraseBank.noun} or it will be crushed into ${phraseBank.shape}.`,
    `Your subscription to ${phraseBank.noun} ${phraseBank.state}. Please contact our ${phraseBank.secNoun} Department to view and edit your subscription terms.`,
    `This message has been generated on behalf of the ${phraseBank.secNoun} ${phraseBank.company} to inform you of ${phraseBank.adjective} changes to your ${phraseBank.noun}. To view these changes, access your ${phraseBank.secNoun} Account through our website within the next ${phraseBank._timeLimit()} ${phraseBank._stateBank.state4[randNum(4)]}.`
];

// Another array to enable extended messages
/*
const add_lib = [
    `You now have ${phraseBank._timeLimit()} to move your ${phraseBank.shape}.`,
    `ADD LIB 2`,
    `ADD LIB 3`
];
*/

const generateMessage = () => {
    const numOfMessages = madLib.length;
    let message = [];

    message.push(greet, madLib[randNum(numOfMessages)]);
    // message.push(madLib[1]); //for testing individual messages
    return message.join(" ");
}

console.log(generateMessage());

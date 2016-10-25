var verbs =
[
    ["go to", "goes to", "going to", "went to", "gone to"],
    ["look at", "looks at", "looking at", "looked at", "looked at"],
    ["eat", "eats", "eating", "ate", "eaten"]
];

var tenses =
[
    {name:"Present", singular:1, plural:0, format:"%subject %verb %complement"},
    {name:"Past", singular:3, plural:3, format:"%subject %verb %complement"},
    {name:"Present Continues", singular:2, plural:2, format:"%subject %be %verb %complement"}
];

var subjects =
[
    {name:"I", be:"am", singular:0},
    {name:"The zombies", be:"are", singular:0},
    {name:"The monster", be:"is", singular:1}

];

var complementsForVerbs =
[
    ["a graveyard", "a party", "Transylvania", "a haunted house"],
    ["the pumpkins", "spooky sights", "the moon", "the candy"],
    ["brains", "chocolate", "peanut butter cups", "candy apples"]
]

Array.prototype.random = function(){return this[Math.floor(Math.random() * this.length)];};

function generate(){
    var index = Math.floor(verbs.length * Math.random());
    var tense = tenses.random();
    var subject = subjects.random();
    var verb = verbs[index];
    var complement = complementsForVerbs[index];
    var str = tense.format;
    str = str.replace("%subject", subject.name).replace("%be", subject.be);
    str = str.replace("%verb", verb[subject.singular ? tense.singular : tense.plural]);
    str = str.replace("%complement", complement.random());
    return str;
}

for(var i=0;i<25;i++)document.write(generate() + "<br>");

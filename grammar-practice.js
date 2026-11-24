"use strict";

// Two contexts per pattern. Each activity tests a different operation on the pattern.
// Fields are contexts, accepted gap answers, distractors, task cue and feedback.
// A tilde separates answer sets or distractors for the two contexts when needed.
const grammarPracticeBank = {
  "1-LS-21": [
    ["The library has longer opening hours. ___, it has added a quiet floor.", "The club lends equipment. ___, it offers free lessons.", "In addition|Additionally|Furthermore|Also|What’s more", "However|Otherwise|Instead", "Add a supporting point.", "An additive marker introduces another point that supports the first one."],
    ["The bus is cheap. ___, it stops outside the college.", "The café is close to class. ___, it gives students a discount.", "Also|In addition|Additionally|Furthermore|What’s more|Plus|Besides", "Nevertheless|As a result|For example", "Add a separate detail.", "The second detail is additional information, rather than a consequence or example of the first."],
    ["The event is free. ___ is that it ends before the last train.", "The project is affordable. ___ is that everyone can join in.", "Another reason", "Another reason that|Also reason|Another because", "Introduce one more reason.", "Another reason is that introduces a further reason as a full clause."],
    ["The first benefit is lower cost. ___, the equipment can be repaired locally.", "The new hall has room for more classes. ___, it is easier to reach.", "Furthermore|Moreover|In addition|Additionally", "On the other hand|Unless|Instead of", "Use a formal marker to add a benefit.", "Furthermore and similar formal markers add a point to an argument."],
    ["Let’s walk there. It’s nearby. ___, the weather’s lovely.", "I’d pick the blue bag. It’s lighter. ___, it’s cheaper.", "Plus|What’s more|Besides|Also", "Although|Therefore|In contrast", "Use a conversational marker to add a reason.", "Plus is a common conversational way to give one more reason."],
    ["We can donate the books. ___, the library asked for new reading material.", "I’d try the afternoon course. ___, the morning one is already full.", "Besides|Plus|What’s more", "Whereas|As soon as|As a result", "Add another reason in conversation.", "Besides adds a further reason to support the suggestion."],
    ["The service helps families find housing. ___, it provides advice about jobs.", "The centre rents rooms to clubs. ___, it lets students book study space.", "Additionally|In addition|Also|Furthermore", "Even though|Therefore|Yet", "Use a marker to introduce another service.", "An additive marker helps listeners follow two related details."],
    ["We should choose the smaller room. ___ that it is easier to heat.", "We could use the sports hall. ___ that it is already available.", "Another reason is", "Another reason are|Another reason it|Another reason because", "Add another reason using a that-clause.", "Use singular is after another reason, followed by a that-clause."],
  ],
  "1-WR-21": [
    ["The website is useful. ___, it is difficult to navigate.", "The workshop was interesting. ___, only a few people attended.", "However|Nevertheless|Nonetheless", "Also|Likewise|For example", "Show contrast at the start of a new sentence.", "However introduces a contrast with the previous sentence."],
    ["___ the buses are cheap, they are often crowded.", "___ the room was small, it had excellent lighting.", "Although|Though|Even though|While", "Nevertheless|But|Despite", "Begin with a contrast clause before the main clause.", "Although and though can introduce a subordinate clause of contrast."],
    ["Mina prefers studying in silence, ___ Alex likes background music.", "The north entrance closes early, ___ the south entrance stays open.", "whereas|while|but", "so that|because of|as well as", "Contrast two different choices.", "Whereas and while can put two different facts side by side."],
    ["___ the old and the new versions allow users to send messages.", "___ the library and the café have free Wi-Fi.", "Both", "Either of|Neither|Equally", "Show that the same fact applies to two things.", "Both goes before two coordinated items joined by and."],
    ["Short meetings save time. ___, short emails are often easier to read.", "Peer feedback helps writers spot gaps. ___, a second reading can reveal missing details.", "Equally|Likewise|Similarly", "However|Instead|Otherwise", "Introduce a similar point in a new sentence.", "Equally, likewise and similarly connect comparable points."],
    ["Text messages, ___ emails, can be misunderstood without a clear tone.", "Video calls, ___ phone calls, let people speak in real time.", "like", "whereas|although|equally", "Compare two noun phrases.", "Like is followed by a noun phrase when it introduces a similarity."],
    ["On the one hand, online groups are convenient. ___, learners can miss face-to-face contact.", "On the one hand, the shortcut saves time. ___, the longer route is safer at night.", "On the other hand", "Both|Equally|On the same hand", "Complete the pair that presents two sides.", "On the other hand introduces the second side after on the one hand."],
    ["___ Leo studies on campus, Nora studies from home.", "___ one group met weekly, the other group met every day.", "Whereas|While|Although|Though", "However|Equally|Both", "Begin with a clause contrasting the two groups.", "While and whereas can introduce the first of two contrasting clauses."],
  ],
  "2-LS-39": [
    ["The chef, ___ works in a small café, grows her own herbs.", "Our guide, ___ teaches cooking, explained the recipe.", "who", "which|where|that", "Add information about a person.", "Use who for a person in a non-defining relative clause."],
    ["I spoke to a farmer ___ daughter sells rice at the market.", "We met a cook ___ family owns the stall.", "whose", "who|which|whom", "Show possession.", "Whose links a person to something or someone connected to them."],
    ["Is this the stall ___ you bought lunch?", "We revisited the market ___ we met the chef.", "where|at which", "whose|which|who", "Link a place to an activity that happened there.", "Where can stand for in or at a place."],
    ["I remember the day ___ we opened the café.", "Winter is the season ___ the market gets fewer visitors.", "when|on which~when|in which|during which", "who|whose|where", "Link the clause to a time.", "When introduces extra information about a time or occasion."],
    ["The stall ___ we visited yesterday is closed today.", "The café ___ we tried last month has moved.", "that|which", "where|whose|who", "Make the relative word the object of visited or tried.", "Visited and tried take a direct object here. Use that or which, or leave the relative word out in a defining clause."],
    ["The jar, ___ was still sealed, stayed fresh for weeks.", "The new fridge, ___ arrived on Monday, uses less energy.", "which", "that|whose|who", "Add extra information about a thing.", "Which can introduce a non-defining clause about a thing."],
    ["The meals ___ contain nuts are marked on the menu.", "The ingredients ___ come from nearby farms are listed first.", "which|that", "who|where|whose", "Identify things that do the action in the clause.", "Which or that acts as the subject here, so it cannot be left out."],
    ["Anita, ___ recipe won first prize, opened a café.", "Tariq, ___ family grows olives, offered us a tasting.", "whose", "which|that|where", "Add a possessive detail to a named person.", "Whose can show possession in a non-defining clause."],
  ],
  "2-WR-39": [
    ["Olivia, ___ works at the market, gave us a recipe.", "Sam, ___ runs the farm shop, recommended the apples.", "who", "which|where|that", "Add a detail about a named person.", "Use who in a non-defining clause about a person."],
    ["The restaurant ___ we ate serves local produce.", "We visited the village ___ the farmers sell their beans.", "where|at which|in which", "whose|who|which", "Connect a place with an activity.", "Use where or an appropriate preposition plus which to connect an activity to a place."],
    ["The tomatoes ___ arrived this morning are on the counter.", "The boxes ___ contain glass are marked in red.", "that|which", "who|where|whose", "Use a relative subject for a thing.", "Who is for people. Which and that can refer to things in a defining clause."],
    ["Our local greenhouse, ___ opened in May, grows lettuce.", "This market, ___ is indoors, opens all winter.", "which", "that|where|who", "Add extra information about a thing.", "Use which for a thing in a non-defining relative clause."],
    ["We thanked the vendors ___ had stayed late.", "Families ___ live nearby can collect a food box.", "who|that", "where|which|whose", "Identify the people doing the action.", "Who or that can act as the subject of a defining clause about people."],
    ["We liked the dishes ___ the students prepared.", "She priced the vegetables ___ the farm delivered.", "that|which", "who|whose|where", "Refer to the object of the action.", "In a defining clause about a thing, that or which can stand for the object."],
    ["Lan, ___ teaches food science, led the tour.", "Mina, ___ writes about farming, visited the school.", "who", "that|where|which", "Use a non-defining clause between commas.", "Use who between commas to add extra information about a person."],
    ["The village ___ the festival takes place is near the coast.", "The shop ___ the bread is baked closes at noon.", "where|in which|at which", "who|whose|that", "Use a relative expression for location.", "Where introduces the place in which an event happens."],
  ],
  "2-WR-41": [
    ["The market sells rice, ___ it also sells beans.", "Nora brought bread, ___ Adam brought fruit too.", "and", "because of|although|despite", "Join two independent clauses to add a point.", "And coordinates two complete ideas with an additive meaning."],
    ["We planned to cook outdoors, ___ the weather turned cold.", "The bread looks fresh, ___ it tastes stale.", "but|yet", "so|in order to|because of", "Show a contrast with a coordinating conjunction.", "But and yet can join independent clauses that contrast."],
    ["It was raining hard, ___ we moved dinner indoors.", "The shop had run out of bread, ___ we cooked rice instead.", "so", "but|because of|despite", "Introduce a result with a coordinating conjunction.", "So can link an independent result clause to the reason before it."],
    ["___ the roads were flooded, the delivery was late.", "___ the freezer had stopped working, we called a technician.", "Since|Because|As", "And|Despite|Because of", "Put the reason in an introductory subordinate clause.", "Since and because can introduce a reason when followed by a subject and verb."],
    ["___ the farm produces plenty of rice, it buys fruit from elsewhere.", "___ locally grown herbs are cheap, imported spices can be expensive.", "While|Although|Though|Whereas", "However|Despite|But", "Introduce a contrast with a subordinate clause.", "While can introduce a contrast clause before the main clause."],
    ["She washed the grapes, ___ he sliced the apples as well.", "The class planned the menu, ___ the teachers bought the ingredients too.", "and", "despite|although|because of", "Connect two complete ideas that add information.", "Use and to connect two independent clauses when the second adds a related action."],
    ["The farmer wanted to plant earlier, ___ the ground was still frozen.", "The restaurant had a free table, ___ the group wanted to eat outside.", "but|yet", "therefore|despite|in order to", "Choose a coordinating conjunction for an unexpected contrast.", "But and yet are coordinating options for contrast."],
    ["The bags were too heavy, ___ we made two trips.", "The kitchen had no salt, ___ we borrowed some from a neighbour.", "so", "yet|because of|in order to", "Join the reason to its result.", "So introduces the second independent clause as a result."],
  ],
  "3-LS-57": [
    ["Before you sign, you ___ check the price carefully.", "Before choosing a supplier, you ___ read both offers.", "should", "should to|should checking|should checked", "Give clear advice with SHOULD.", "Should takes the base form of the verb."],
    ["You ___ share your password with a colleague.", "You ___ ignore a message about a missed payment.", "shouldn’t|should not", "don't should|should not to|shouldn't to", "Advise against an action using SHOULD.", "Put not after should and use the base form."],
    ["You ___ try another shop if the first one is too expensive.", "You ___ ask another team to share the cost.", "could|might|may", "could to|could asking|could tried", "Offer a possible option.", "Could takes the base verb and presents a suggestion."],
    ["You ___ want to speak to your manager first.", "You ___ want to compare prices before deciding.", "may|might", "may to|may wanted|may wanting", "Soften the suggestion with MAY or MIGHT.", "May or might want to is a polite way to suggest an action."],
    ["You could ___ a short meeting before the deadline.", "You could ___ an appointment with the supplier.", "arrange", "arranging|arranged|to arrange", "Use the base form of ARRANGE.", "Use the base form after could."],
    ["The team should ___ the numbers again.", "The shop should ___ the prices before printing the posters.", "check", "checks|checked|checking", "Use the base form of CHECK.", "A modal is followed by the base form, even with a singular subject."],
    ["You might want ___ a cheaper design.", "You might want ___ another location.", "to consider", "consider|considering|to considered", "Complete the suggestion with CONSIDER.", "After might want, the next verb usually takes to."],
    ["If you need more time, you ___ ask for an extension or share the work.", "If the shop is busy, you ___ come later or order online.", "could|might|may", "could to|could asked|could asking", "Offer alternatives with a modal.", "Could presents possibilities rather than a single strong recommendation."],
  ],
  "3-WR-57": [
    ["Visitors ___ sign in. This is a rule.", "Drivers ___ carry a valid licence. The law requires it.", "must|have to|need to", "must to|must signing|must signed", "Express an obligation.", "Must is followed by the base form without to."],
    ["Staff ___ share customer passwords. It is forbidden.", "Visitors ___ touch the equipment. It is against the rules.", "mustn’t|must not", "don't must|must not to|mustn't to", "Say that an action is prohibited.", "Mustn’t expresses prohibition."],
    ["You ___ print the form. A digital copy is enough.", "You ___ book a desk. You can use any free one.", "don’t have to|don’t need to|do not have to|do not need to|needn’t|need not", "mustn't|don't have|don't need", "Say that something is optional.", "Don’t have to and don’t need to mean there is no obligation."],
    ["The manager has ___ the report today.", "The visitor has ___ a badge before entering.", "to submit|to present|to hand in~to show|to present|to display", "submit|submitting|submitted to~show|showing|showed to", "Complete has to with a suitable base verb.", "Has to is followed by the base form."],
    ["The team needs ___ the sales figures before the meeting.", "The receptionist needs ___ the guest list before opening the doors.", "to check", "check|checked|checking to", "Use CHECK after needs to. Include to in your answer.", "Needs to is followed by a base verb."],
    ["You must ___ your invoice with the form.", "You must ___ a copy of your ID with the application.", "include", "to include|includes|including", "Use the base form of INCLUDE.", "Use the base form after must."],
    ["One new employee ___ complete a safety course before starting.", "A delivery driver ___ show identification at the entrance.", "has to|needs to|must", "have to|needs|has", "Use a form that agrees with a singular subject.", "Use has to and needs to with a singular subject. Must stays the same."],
    ["We ___ pay today. The deadline is next Friday.", "You ___ bring food to the meeting. Lunch is provided.", "don’t need to|don’t have to|do not need to|do not have to|needn’t|need not", "mustn't|don't need|not have to", "Express lack of necessity.", "Don’t need to is appropriate when an action is unnecessary."],
  ],
  "4-LS-75": [
    ["The road reopened ___ the workers repaired it.", "The event started ___ the volunteers finally arrived.", "after|once|when", "before|in order to|because of", "Put the repair or arrival before the main event.", "After and once place the clause event before the main event."],
    ["The council ordered new buses ___ the old ones stopped working, so service continued.", "We booked the tickets ___ the prices rose, so we paid less.", "before", "after|once|so that", "Put the main event first in time.", "Before places the main event earlier than the event in its clause."],
    ["The office ___ at six yesterday.", "The school ___ its main gate early last night.", "closed", "closes|is closing|close", "Use the simple past of CLOSE.", "Use the simple past for a completed action at a finished past time."],
    ["The match was cancelled ___ the pitch was flooded.", "They shut the station ___ a pipe burst.", "because|since|as", "because of|in order to|so that", "Give the reason with a full clause.", "Because, since and as can introduce a clause explaining a reason."],
    ["The team met early ___ check the equipment.", "The council added lamps ___ improve safety.", "in order to|to|so as to", "because|so that|since", "Express purpose before a base verb.", "In order to and to are followed by a base verb for purpose."],
    ["They moved the bus stop ___ people could wait under cover.", "We left a note ___ the next team could find the key.", "so that|so", "because of|in order to|despite", "Give the intended result with a full clause.", "So that introduces a purpose clause with its own subject and verb."],
    ["The market ___ in 1980 and later moved to a bigger site.", "The centre ___ in 2005 and quickly attracted visitors.", "opened", "opens|is opening|will open", "Use the simple past of OPEN.", "A finished date calls for the simple past."],
    ["The final exhibition opened ___ the builders finished their work.", "The team served lunch ___ the guests took their seats.", "once|after|when", "in order to|because of|despite", "Show that one event followed another.", "Once and after connect a later action to an earlier completed event."],
  ],
  "4-WR-75": [
    ["The number of visitors ___ from 40 to 85 last May.", "Interest in the service ___ sharply in 2020.", "rose", "rised|rise|risen", "Use the past of RISE.", "Rise is irregular. Its simple past form is rose."],
    ["Ticket sales ___ from 100 to 70 last July.", "The number of orders ___ by ten in April.", "fell", "falled|fall|fallen", "Use the past of FALL.", "Fall changes to fell in the simple past."],
    ["The shop ___ 80 bags in May.", "The students ___ their old textbooks last Friday.", "sold", "selled|sells|selling", "Use the past of SELL.", "Sell changes to sold in the simple past."],
    ["Families ___ more on food in December.", "The company ___ £500 on advertising last week.", "spent", "spended|spend|spends", "Use the past of SPEND.", "The simple past of spend is spent."],
    ["Sales didn’t ___ in the final month.", "The cost didn’t ___ after January.", "rise", "rose|rised|rising", "Use RISE after didn’t.", "After didn’t, use rise, the base form."],
    ["The figure fell ___ 120 to 95.", "The rate rose ___ 6% to 9%.", "from", "at|between|until", "Introduce a starting value.", "Use from before the starting value in from X to Y."],
    ["The rate changed ___ 2015 and 2020.", "The number of stores grew ___ March and May.", "between", "from|to|until", "Complete the pair with AND.", "Between X and Y identifies two points in time."],
    ["The factory ___ two new machines in June.", "Mina ___ a cheaper laptop last October.", "bought", "buyed|buys|buy", "Use the past of BUY.", "Buy changes to bought in the simple past."],
  ],
  "5-LS-93": [
    ["Only ___ students chose the extra test. There were three in all.", "Just ___ participants stayed for the final question. We counted four.", "a few|a small number of|several", "a little|much|an amount of", "Use a small quantity with a plural count noun.", "A few is used before plural count nouns."],
    ["We only need ___ time to finish the chart.", "There is just ___ room for one more slide.", "a little|a small amount of|some", "a few|many|a number of", "Use a small quantity with an uncountable noun.", "A little fits uncountable nouns such as time and room."],
    ["___ of the students chose the first option. Only two did.", "___ of our classmates scored full marks. We counted three.", "A few|A small number|Several", "A little|Much|An amount", "Describe a small part of a specific group.", "Use a few of before a specific plural group."],
    ["The new result is only ___ higher, by less than one point.", "The estimate is only ___ lower, by less than half a percent.", "slightly|marginally|a little", "considerably|significantly|many", "Describe a very small difference.", "Slightly and marginally modify a comparative to show a small difference."],
    ["The new group scored ___ higher, by forty points.", "Travel took ___ longer after the storm, almost twice as long.", "considerably|significantly|much|a lot", "slightly|marginally|a few", "Describe a large difference.", "Considerably and significantly emphasise a large difference."],
    ["___ likely outcome is another delay, according to every forecast.", "___ common choice was the evening class, with 75% of votes.", "The most", "Many|A little|The few", "Name the highest level or frequency.", "Most forms the superlative before a suitable adjective."],
    ["They collected ___ data from hundreds of responses.", "We spent ___ time revising the presentation, nearly a week.", "a lot of|lots of|a great deal of|a large amount of", "many|a few|a number of", "Describe a large uncountable quantity.", "A lot of can quantify uncountable nouns."],
    ["The orange option received the ___ support of all three options.", "This plan required the ___ effort of all the suggestions.", "least", "fewest|less|little", "Choose the lowest amount among the options.", "Use least with an uncountable noun for the lowest amount."],
  ],
  "5-WR-93": [
    ["How ___ trees were there in the old park?", "How ___ buildings are shown on the plan?", "many", "much|little|a lot of", "Ask about a plural count noun.", "How many goes with plural count nouns."],
    ["How ___ space is available for the new café?", "How ___ water did the farm use in July?", "much", "many|few|a number of", "Ask about an uncountable noun.", "How much asks about an uncountable quantity."],
    ["There was ___ traffic, so the street felt crowded all day.", "There is ___ noise near the main road, more than residents can tolerate.", "too much", "too many|too few|a few", "Show an excessive uncountable quantity.", "Too much fits an uncountable noun when the amount is excessive."],
    ["There are ___ cars for such a narrow road.", "There were ___ visitors for the small waiting room.", "too many", "too much|much|a little", "Show an excessive number of people or things.", "Too many fits plural count nouns when the number is excessive."],
    ["There are ___ bike racks left, just enough for our group.", "A plan shows ___ empty rooms that could be used for classes.", "a few|some|several", "a little|much|an amount of", "Describe a small number of available items.", "A few means some and is used with plural count nouns."],
    ["There is ___ green space in that district, just one very small garden.", "There is ___ water left in the tank, so supplies are urgently needed.", "hardly any|very little|almost no", "many|a few|few", "Show that an uncountable amount is almost zero.", "Hardly any means almost none and can be used with uncountable nouns."],
    ["There weren’t ___ shops on the old map.", "The village doesn’t have ___ places to eat.", "many|a lot of|lots of", "much|a little|too much", "Use a determiner for a plural noun in a negative sentence.", "Many works with plural count nouns, including in negatives."],
    ["There was ___ rubbish by the bridge, because volunteers cleared every piece.", "There were ___ buses after midnight, so we took a taxi.", "no|not any", "none|neither|nothing", "Show a zero quantity before a noun with NO.", "No can go directly before a countable or uncountable noun."],
  ],
  "6-LS-111": [
    ["If you feel nervous, you ___ try a breathing exercise.", "If you miss the bus, you ___ ask a friend for a lift.", "could|might|may|should", "could to|could trying|could tried", "Give advice after a real condition.", "A modal followed by the base verb can express advice in the result clause."],
    ["If you ___ the instructions, you should ask the teacher.", "If you ___ the question, you could read it again.", "don’t understand|do not understand", "won't understand|wouldn't understand|doesn't understand", "Use the present simple for a real condition.", "Use the present simple in the if-clause in this pattern."],
    ["If I ___ you, I would make a study plan.", "If I ___ you, I would ask for more feedback.", "were", "am|will be|would be", "Use the standard expression for imagined advice.", "If I were you is a common way to give advice."],
    ["If I were you, I ___ talk to the course tutor.", "If I were you, I ___ split the work into smaller tasks.", "would|could|might", "would to|would talking|will to", "Complete an imagined suggestion.", "Use would with a base verb after If I were you."],
    ["If you feel tired___ you should take a short break.", "If the first plan fails___ you could try another one.", ",", ";|.|:", "Punctuate the end of the opening if-clause.", "Use a comma after an introductory if-clause."],
    ["If you need more information, you could ___ the office.", "If you feel unsure, you could ___ your tutor.", "contact", "to contact|contacting|contacted", "Use the base form of CONTACT after could.", "Could takes the base form without to."],
    ["If you have a test tomorrow, you ___ stay up all night.", "If you feel unwell, you ___ push yourself too hard.", "shouldn’t|should not", "don't should|shouldn't to|should not staying", "Give advice against an action.", "Should not advises against an action and takes a base verb."],
    ["If I were you, I would ___ the hardest topic first.", "If I were you, I would ___ the group before lunch.", "review|study|revise~contact|message|call", "to review|reviewing|reviewed~to call|calling|called", "Use a suitable base verb after would.", "Would takes a base verb in the result clause."],
  ],
  "6-WR-111": [
    ["If the college ___ the lab, more students will be able to join.", "If the library ___ a new study room, students will have more space.", "opens", "will open|would open|open", "Use the present simple of OPEN for a real condition.", "Use the present simple in an if-clause referring to a real future possibility."],
    ["If the bus arrives early, we ___ have time for coffee.", "If the workshop finishes early, we ___ be home by six.", "will|might|may|could|should", "will to|would have to to|will having", "Complete the result of a real condition.", "Will or another suitable modal can introduce the result of a real condition."],
    ["If the class ___ smaller, everyone could speak more often.", "If the waiting room ___ bigger, more people could sit down.", "were|was", "will be|would be|is being", "Imagine the situation with the past form of BE.", "The unreal conditional uses a past form in the if-clause to imagine a different situation."],
    ["If I had a larger desk, I ___ buy a second monitor.", "If the city had more money, it ___ build a youth centre.", "would|could|might", "will to|would to|would buying", "Give the result of a hypothetical situation.", "Would, could or might takes a base verb in an unreal conditional."],
    ["If pupils ___ more exercise, they might feel less stressed.", "If we ___ a break every hour, we might concentrate better.", "took|did|got~took|had", "would take|will take|taking", "Use a past form to imagine a different habit.", "A past verb form in the if-clause can refer to an imagined present or future."],
    ["What ___ happen if the trains stopped running?", "What ___ change if the school moved to another campus?", "would|could|might", "did to|would to|would happened", "Ask about the result of an imagined situation.", "Use a modal such as would before the subject in an unreal conditional question."],
    ["If the council ___ the proposal, the work will start in May.", "If the panel ___ our design, the project will begin tomorrow.", "accepts", "accept|will accept|accepted to", "Use ACCEPT in the if-clause for a real possibility.", "Use present simple, including -s with a singular third-person subject."],
    ["If students ___ so much after class, they might have more time to rest.", "If staff ___ so much at weekends, they could spend more time with family.", "didn’t work|did not work", "wouldn't work|won't work|didn't worked", "Use the past negative of WORK in the if-clause.", "In an unreal if-clause, use didn’t plus the base verb for a past negative."],
  ],
  "7-LS-129": [
    ["Have you ___ spoken in front of a large group?", "Have you ___ travelled without a map?", "ever", "yet to|ever to|ever have", "Ask if this has happened at any time.", "Ever usually goes before the participle in a present perfect experience question."],
    ["I have ___ seen snow. This is my first time.", "My father has ___ travelled by plane. He has never been to an airport.", "never", "ever to|never have|never to", "Say the experience has not happened at any time.", "Never goes before the participle and makes the meaning negative."],
    ["We have ___ booked the room, so that part is done.", "She has ___ printed the slides, so there is no need to print them again.", "already", "already have|already to|yet to", "Say that something has been done before now.", "Already can go before the participle in the present perfect."],
    ["Have you prepared the speech ___?", "Has your partner finished the poster ___?", "yet", "ever to|still have|already to", "Ask if an expected action has happened.", "Yet usually goes at the end of a present perfect question."],
    ["The speaker hasn’t chosen a topic ___.", "We haven’t received the feedback ___.", "yet", "still have|already to|never have", "Say that an expected action is unfinished.", "Yet goes at the end of a negative present perfect clause."],
    ["I ___ haven’t found my notes, even after searching every room.", "They ___ haven’t sent a reply, even after two reminders.", "still", "yet|never to|still have", "Emphasise that the situation continues.", "Still goes before the negative auxiliary in this pattern."],
    ["Noor has already ___ her presentation.", "The group has already ___ its project.", "finished", "finish|finishing|finishes", "Use the past participle of FINISH.", "The present perfect uses have or has plus a past participle."],
    ["___ you ever given a talk in English?", "___ you ever written a report for a competition?", "Have", "Has|Did|Are", "Choose the auxiliary for a present perfect experience question.", "Have agrees with you and begins the question."],
  ],
  "7-WR-129": [
    ["He has lived here ___ five years.", "We have worked on the project ___ three months.", "for", "since|ago|at", "Introduce a length of time.", "For is followed by a duration."],
    ["The club has met here ___ January.", "The library has offered this service ___ 2018.", "since", "for|ago|during", "Introduce the starting point.", "Since is followed by a starting point in time."],
    ["She ___ felt nervous about flying since childhood.", "The child ___ been afraid of the dark since the storm.", "has", "have|had to|is", "Use the auxiliary that agrees with a singular subject.", "Use has plus a past participle with she or another singular subject."],
    ["The researchers have recently ___ new evidence.", "The scientists have recently ___ a link between sleep and stress.", "found", "find|founding|finds", "Use the participle of FIND.", "The past participle of find is found. Use it after have."],
    ["I’ve had the same fear ___ I was a child.", "She has felt calmer ___ she started taking lessons.", "since", "for|during|ago", "Use a clause to mark the starting point.", "Since can introduce a clause telling when a state began."],
    ["We ___ studied fear responses for years.", "The researchers ___ published several reports so far.", "have", "has|are|were", "Use the present perfect with a plural subject.", "Have is the correct auxiliary for a plural subject."],
    ["She has ___ enjoyed visiting museums, even as a child.", "I have ___ liked quiet places, as far back as I can remember.", "always", "always has|always to|always have", "Use ALWAYS to describe a long-standing preference.", "Always can go between the auxiliary and the participle."],
    ["The team has ___ three reports so far.", "The student has ___ two summaries this month.", "written", "wrote|write|writing", "Use the past participle of WRITE.", "Write changes to written in the present perfect."],
  ],
  "8-LS-147": [
    ["I ___ for the bus when the rain started.", "I ___ for the guide when the lights went out.", "was waiting", "were waiting|was wait|am waiting", "Set the scene with WAIT in the past progressive.", "Use was plus waiting for an ongoing past action with I."],
    ["They ___ dinner when a cat jumped onto the table.", "We ___ lunch when a neighbour knocked at the door.", "were eating", "was eating|were eat|are eating", "Use EAT in the past progressive with a plural subject.", "They and we take were plus the -ing form."],
    ["The lights ___ out while we were working.", "The fire alarm ___ off while the class was reading.", "went", "was go|were go|goes", "Use the simple past of GO for the sudden event.", "Went places the interrupting event on the past timeline."],
    ["While the driver was looking for a place to park, a tyre ___ flat.", "While I was opening my bag, my umbrella ___ to the ground.", "went~fell", "was go|goes|were going~was fell|falls|were fall", "Use a simple past form for the sudden event.", "The simple past can describe the sudden event. The ongoing background uses the past progressive."],
    ["What ___ you doing when the bell rang?", "Where ___ you going when you saw the accident?", "were", "was|did|do", "Ask about an action in progress with YOU.", "Use were before you to form this past progressive question."],
    ["It ___ when we left the house, so I took an umbrella.", "It ___ when the concert ended, so we waited inside.", "was raining", "were raining|was rain|is raining", "Use RAIN to set the scene in the past.", "Use was raining for the weather already in progress."],
    ["The children were playing ___ the ball broke a window.", "The lights were flickering ___ a loud bang came from outside.", "when", "because of|despite|in order to", "Introduce the event that interrupted the background action.", "When can introduce a shorter event that interrupts another action."],
    ["I wasn’t ___ attention when the name was announced.", "The driver wasn’t ___ attention when the signal changed.", "paying", "pay|paid|pays", "Use PAY in the negative past progressive.", "After wasn’t, use the -ing form."],
  ],
  "8-WR-147": [
    ["By the time the guests arrived, the team ___ painting the room.", "By opening day, the builders ___ the main hall.", "had finished", "has finished|had finish|have finished", "Use the past perfect of FINISH for the earlier action.", "The past perfect uses had plus the participle for an earlier past event."],
    ["The visitors ___ after the museum had opened.", "The bus ___ after the meeting had finished.", "arrived", "arrive|have arrived|had arrive", "Use the simple past of ARRIVE for the later event.", "The later event is normally expressed in the simple past."],
    ["Mina hadn’t ___ the book before the lesson began.", "The students hadn’t ___ the article before the teacher asked about it.", "read", "reads|reading|to read", "Complete the negative past perfect with READ.", "After hadn’t, use the past participle, read."],
    ["By the time I reached the platform, the train had already ___.", "By the time the bus reached the school, many pupils had already ___.", "left", "leave|leaving|leaves", "Use the past participle of LEAVE.", "Leave changes to left after the past perfect auxiliary."],
    ["The door ___ after the last visitor had left.", "The café ___ just after the evening event had ended.", "closed", "closes|is closing|have closed", "Put CLOSE on the main past timeline.", "Use the simple past for the main completed action."],
    ["She couldn’t get into the lab because she ___ her key at home.", "He couldn’t open the box because he ___ the key in his office.", "had left", "had leave|has leave|had leaving", "Use LEAVE for what happened before the main event.", "The earlier action uses had plus the past participle left."],
    ["They didn’t ___ a map until Tuesday.", "He didn’t ___ a new camera until the old one broke.", "buy", "bought|buying|buys", "Use BUY in the negative simple past.", "After didn’t, use the base form of the verb."],
    ["The team ___ the report before the director asked for it.", "She ___ her notes before the discussion started.", "had written", "had wrote|had write|had writing", "Use WRITE in the past perfect.", "Write has the participle written, which follows had."],
  ],
  "9-LS-165": [
    ["Solar panels can ___ on a flat roof.", "The new sensors can ___ near the entrance.", "be installed|be fitted|be placed", "be install|installed|been installed", "Use INSTALL in a modal passive.", "A modal passive uses modal + be + past participle."],
    ["Old batteries should not ___ in household bins.", "Broken glass should not ___ in the general waste bag.", "be put|be placed|be thrown", "put be|been put|being put", "Use PUT in a negative modal passive.", "Put not after should and be before the past participle."],
    ["Water could ___ by fixing leaks in the building.", "Energy could ___ by switching the lights off at lunchtime.", "be saved|be conserved", "save|been saved|being saved", "Use SAVE in a modal passive.", "Use could be saved when water or energy receives the action."],
    ["The waste must ___ before the inspection.", "The old cables must ___ before the new system is installed.", "be removed|be cleared away|be taken away", "be remove|been removed|remove", "Use REMOVE in a modal passive.", "Must be removed puts the focus on what will be removed."],
    ["A larger room may ___ for the new equipment.", "Extra storage space may ___ during the first month.", "be needed|be required", "been needed|need be|be needing", "Use NEED in a modal passive.", "May be needed expresses a possible requirement."],
    ["The reports should ___ before they are shared.", "The air filters should ___ regularly.", "be checked|be inspected|be reviewed", "be check|checked|been checked", "Use CHECK in a modal passive.", "The form is should be followed by the past participle checked."],
    ["These boxes can ___ again next week.", "The plastic bottles can ___ more than once.", "be reused|be used again", "reuse|been reused|be reuse", "Use REUSE in a modal passive.", "Can be reused makes the object of the action the subject."],
    ["The garden might ___ during the winter.", "The paths might ___ while work is underway.", "be closed|be shut", "close be|be closing to|been closed", "Use CLOSE in a modal passive.", "Might be closed shows that someone may close it."],
  ],
  "9-WR-165": [
    ["Three parks ___ this year, and residents can visit them now.", "Several cycle routes ___ this year and are already in use.", "have been opened|have been created|have been added", "has been opened|have opened by|have being opened", "Use OPEN in the present perfect passive.", "A plural subject takes have been plus the past participle."],
    ["The old station ___ recently, and services have restarted.", "The town hall ___ recently, and it is now open to visitors.", "has been repaired|has been restored|has been renovated", "have been repaired|has being repaired|has been repair", "Use REPAIR in the present perfect passive.", "Use has been plus a past participle with this singular subject."],
    ["By the time the inspectors arrived, the waste ___ from the building.", "By the time the team arrived, the old equipment ___ from the lab.", "had been removed", "has been removed|had been remove|had being removed", "Put the earlier passive event in the past perfect.", "Had been removed places the completed removal before a later past event."],
    ["Two reports haven’t ___ yet.", "The test results haven’t ___ yet.", "been published|been released|been shared", "being published|be published|been publish", "Make a negative present perfect passive with PUBLISH.", "The pattern is haven’t been followed by the participle."],
    ["The equipment had not ___ when the volunteers arrived.", "The solar panels had not ___ when the storm began.", "been installed|been fitted", "be installed|being installed|been install", "Make a negative past perfect passive with INSTALL.", "Use had not been plus the past participle."],
    ["The mural has been painted ___ local students.", "The study has been published ___ the research team.", "by", "from|with|at", "Name the agent of the passive action.", "Use by to introduce the person or group that performed the action."],
    ["Since the project began, fifty trees have ___ in the neighbourhood.", "So far, a dozen fruit trees have ___ behind the school.", "been planted", "being planted|been plant|be planted", "Use PLANT in the present perfect passive.", "Have been planted links the action to its result now."],
    ["Before 2019, the stream had ___ by a nearby factory.", "Before the clean-up, the beach had ___ by waste from the harbour.", "been polluted|been contaminated", "be polluted|been pollute|being polluted", "Use POLLUTE in the past perfect passive.", "Had been polluted describes an action completed before another past point."],
  ],
  "10-LS-183": [
    ["Can you tell me where the clinic ___?", "Do you know where the pharmacy ___?", "is", "is it|does it|is there it", "Use statement word order in the embedded question.", "In the embedded clause, the subject comes before is."],
    ["Do you know ___ the pharmacy opens on Sundays?", "Can you tell me ___ this bus stops at the hospital?", "if|whether", "where|who|how much", "Embed a yes/no question.", "Use if or whether when the direct question expects yes or no."],
    ["Could you tell me what time the clinic ___?", "Do you know what time the appointment ___?", "starts|begins|opens", "does it start|does start it|start does", "Embed a present simple question with WHAT TIME.", "Remove question-only does and use statement order with a singular verb."],
    ["Do you remember how much you ___ for the test?", "Do you know how much the patient ___ for the visit?", "paid", "did you pay|did paid|pays did", "Use PAY in the past in the embedded clause.", "Remove did and put the past tense on paid."],
    ["Do you know whether the doctor ___ taking new patients?", "Could you tell me if the clinic ___ accepting bookings?", "is", "does|is the|it is does", "Use statement order after WHETHER or IF.", "The subject is already given. Use is after it for the progressive form."],
    ["Can you tell me when the service ___ last year?", "Do you remember when the course ___ in 2024?", "started|began|opened", "did it start|did started|starts", "Embed a question about a finished past event.", "Use an ordinary past form after the embedded subject."],
    ["Do you know how many staff members the clinic ___?", "Can you tell me how many rooms the centre ___?", "has", "does it have|have does|does has", "Use HAVE with a singular subject in an embedded clause.", "The clause uses statement order, so the clinic has is the right pattern."],
    ["Could you tell me ___ the nurse will call us today?", "Do you know ___ we need an appointment tomorrow?", "if|whether", "what|who|where", "Introduce a yes/no question inside a polite request.", "If or whether introduces an embedded yes/no question."],
  ],
  "10-WR-183": [
    ["‘I feel tired,’ Mina said. Mina said that ___ tired.", "‘I feel dizzy,’ Leo said. Leo said that ___ dizzy.", "she felt~he felt", "I feel|she feel|felt she~I feel|he feel|felt he", "Report the statement with a changed pronoun and past tense.", "The pronoun refers to the original speaker and feel usually backshifts to felt."],
    ["The doctors said, ‘We have finished.’ The doctors said they ___.", "The nurses said, ‘We have checked the records.’ The nurses said they ___ the records.", "had finished~had checked", "had finish|have finish|had finishing~had check|have check|had checking", "Backshift the present perfect to the past perfect.", "Have finished or have checked becomes had plus the same participle."],
    ["‘I lost the file,’ the assistant said. The assistant said that they ___ the file.", "‘We lost our notes,’ the team said. The team said that they ___ their notes.", "had lost", "had lose|has lose|had losing", "Backshift the simple past of LOSE.", "Lost becomes had lost when backshifted to the past perfect."],
    ["The doctor said, ‘The clinic will close early.’ The doctor said that the clinic ___ close early.", "The team said, ‘The results will arrive on Monday.’ The team said the results ___ arrive on Monday.", "would", "would to|would closing|will to", "Backshift WILL after a past reporting verb.", "Will normally becomes would in this type of reported statement."],
    ["‘Our study took two years,’ the researchers said. They said ___ study had taken two years.", "‘Our tests were complete,’ the nurses said. They said ___ tests had been complete.", "their", "them|they|theirs", "Change the possessive OUR to match the reported speaker.", "Use their before the noun when reporting what they said."],
    ["The researcher ___ that the result was unusual.", "The journalist ___ that the new service had received good feedback.", "reported|said|stated|noted|explained", "told that she|report|reporting", "Use a reporting verb in the simple past.", "Reported is a past reporting verb that can be followed by a that-clause."],
    ["‘We can help,’ the team said. The team said that they ___ help.", "‘We can collect the forms,’ the nurses said. The nurses said that they ___ collect the forms.", "could", "could to|could collected|can to", "Backshift CAN in reported speech.", "Can commonly becomes could in past reporting."],
    ["‘I am ready,’ she said. She said that ___ ready.", "‘I am worried,’ she said. She said that ___ worried.", "she was", "I were|she were|was she", "Report I AM with the appropriate pronoun and tense.", "I changes to she for this speaker. Am backshifts to was."],
  ],
};

const grammarExerciseTypes = {
  choice: { label: "Multiple choice", count: 8 },
  fill: { label: "Fill in the blank", count: 8 },
  correction: { label: "Correct an error", count: 7 },
  apply: { label: "Rewrite the sentence", count: 7 },
};

function grammarLessonKey(lesson) {
  return `${lesson.unit}-${lesson.section}-${lesson.page}`;
}

function grammarExercises(lesson) {
  const key = grammarLessonKey(lesson);
  const rows = grammarPracticeBank[key];
  return Object.entries(grammarExerciseTypes).flatMap(([type, { count }]) =>
    rows.slice(0, count).map(([first, second, accepted, distractors, cue, explanation], index) => {
      const useSecond = type === "fill" || (type === "correction" && index % 2 === 0) || (type === "apply" && index % 2 === 1);
      const context = useSecond ? second : first;
      const select = value => {
        const [firstSet, secondSet = firstSet] = value.split("~");
        return (useSecond ? secondSet : firstSet).split("|");
      };
      const gaps = select(accepted);
      const wrong = select(distractors);
      const sentence = gap => context.replace("___", () => gap);
      const wholeSentence = type === "correction" || type === "apply";
      const answers = wholeSentence ? gaps.map(sentence) : gaps;
      const options = type === "choice" ? [answers[0], ...wrong] :
        type === "correction" ? [answers[0], ...wrong.map(sentence)] : [];
      const prompt = type === "correction" ? sentence(wrong[0]) :
        type === "apply" ? sentence(`[${wrong[0]}]`) : context;
      return { id: `${key}-${type}-${index + 1}`, type, prompt, cue, answers, options, explanation };
    })
  );
}

function normalizeGrammarAnswer(value, wholeSentence) {
  const normalized = value.normalize("NFKC").toLowerCase().trim()
    .replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").replace(/\s+([,.;:?!])/g, "$1");
  return wholeSentence ? normalized.replace(/[.!?]$/, "") : normalized;
}

---
title: If you were to start React all over again what would you do? [NSFW]
authors:
  - name: louiechristie
    url: https://gravatar.com/louiechristie
    avatarUrl: >-
      https://2.gravatar.com/avatar/567a75de3daf55f13db5539777a5208dca4dcf4795659bc7848b684d3411dd3e?s=96&d=https%3A%2F%2F2.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D96&r=G
date: 2018-11-30T22:13:42.000Z
metadata:
  categories:
    - Rant
    - web development
  tags:
    - Winter 2018 Series
  media:
    featuredImage: assets/img_2843-SUM9Vx9FrOIR.png
  featuredImage: https://louiechristie.wordpress.com/wp-content/uploads/2019/04/img_2843.png
  uuid: 11ty/import::wordpressapi-hosted::http://blog.louiechristie.com/?p=466
  type: wordpressapi-hosted
  url: >-
    https://louiechristie.wordpress.com/2018/11/30/if-you-were-to-start-react-all-over-again-what-would-you-do/
---
> If you were to start react all over again what would you do?

This was a text sent to me by Alvin (not his real name) a software tester, wannabie junior software developer, who has studied the basics of coding including HTML, CSS and Javascript.

If you don’t know what that sentence means, probably stop reading now.

This post is going to get technical. I’m aiming this blog post at Alvin, so if that doesn’t sound like you, maybe go do something more important, like having lunch or caring for the people around you.

React is a technology created by Facebook for building websites.

React is also a technology for building mobile phone apps, using React’s teenage sister technology React Native.

**TLDR; To Long Didn’t Read this blog post? If you are just looking for a [quick list resources to start with React, go to the end of this blog post.](#things-to-do-instantly)**

Still, here?

Great!

Let’s begin.

Dear Alvin and Dear reader, here is my answer…

Go to a top university and study Computer Science for at least three years, pay particular attention to object oriented programming, and then come back to me.

Wait, you don’t have £27,000+ tuition fees, plus living expenses and three years to spare?

Too bad.  I had a lot of fun. Especially the summer BBQs. And the student theatre. And the all nighters doing coding projects in Java or SQL or LISP or something. It all seemed very academic at the time, but over time some of those early lessons have rung true.

I remember talking to a junior developer in a previous job who had dropped out of computer science at university and come to work for us.

“Do they still teach that you should nail down the API before you work on anything else?” I asked.

“Yes” he said.

“So that’s a piece of advice that is a least 20 years old that this company still isn’t doing.” I said with quiet resignation.

So Alvin, given you are not going to spend another three years at university, here is Louie Christie’s Computer Science degree in a weekend syllabus.

Bear in mind this is not complete but it is informed by half a life-time so far of studying and working with computers, and observing users of computers. It’s also irreverent, opinionated, and probably wrong in places\*. But it’s cheaper than £27,000.

(\* See the comment about nailing down the API above if you are a GraphQL aficionado/don’t like thinking ahead/like doing rework.)

## Louie Christie’s Computer Science degree in a weekend syllabus

[Read Chapter 1: The Tar Pit in the book Mythical Man-Month by Fred Brooks](https://www.louiechristie.com/tech/offer/). It was our first bit of reading for my first seminar in week one. If you really can’t bring yourself to read the chapter, [at least look at the picture on the front](https://en.wikipedia.org/wiki/The_Mythical_Man-Month). It’s a sabre-tooth tiger drowning in a thick, marmite-like, bog, becoming extinct. The point is, that’s you. The marmite bog is the career you’ve just volunteered yourself for, and that sabre-tooth tiger, that’s you, drowning, head only just above the water of project managers, bad designs, broken dreams, wasted money, and the latest failed National Health Service IT project.

Right, now Google for an article, that I read before I did my coding boot camp, that I can’t find any more, if you find it send me the link. @TODO find link@. It was about your personal project, the one with clean code, that you wrote and understand, that is perfectly modular, virtually bug free, and possibly even documented. The point of that article is that any work project is never going to be as pure as that. Other people will get involved, people will tell you to ‘hit the ground running’, that ‘we are going through a busy patch’, that sort of thing, and you’ll deal with shit code that you hate. Which later you’ll discover is actually much better than you you thought it was, (because it’s easier to write code than to read it, but that’s another story.) Great, that’s your university assignments done.

Now Google what DRY means (clue – don’t repeat yourself.) Now you understand the basics of object-oriented programming. Later in your career people will say things like ‘technical debt is acceptable to get a minimum viable product’ or ‘deliver as much client value as quickly as possible’ or just ‘we don’t have time’. When these things happen, you’re probably going to have to repeat yourself. But keep the DRY mantra in mind and when you later deal with the headfuck you’ve created and consider then going DRY or changing jobs.

It was around this time on my university course some grey haired academic told us that Java is a proper object oriented programming language, and Javascript is a frivolous scripting language that copied the name, was thrown together in 10 days, and will never take off. Ignore this advice. 20 years later it turns out Javascript is the [most used programming language on Github](https://githut.info/), and in my opinion, in 2018-19, your best bet for getting a job. Also bear in mind that Java is a proper object oriented programming language, and Javascript is a frivolous scripting language that copied the name and was thrown together in ten days.

Because they sound similar, recruitment consultants will often try and recuit you for the wrong one\*. Also, technical mangers will think they are the same thing, especially if they have been working with Java/JavaScript for many years.

( \* See a possible future post on recruitment consultants and ‘anything that says Java is gold’.)

Also, don’t create global variables, and don’t have side effects in your methods or functions\*. That’s because if you do those things your code becomes more of a headfuck. Also I read some article criticising some car manufacturer’s code that had thousands of global variables that were literally a death trap.

(\* Please let me know the difference between a method and a function if you find out. It’s the sort of tech trivia mid-level programmers love to ask in job interviews, especially if they can catch you out and feel smug.)

Basically the idea is that you have separate chucks of code that operate independently and don’t tinker with each other. Except when you join them together in a system and they pass data between each other in documented, predictable, ways.

Ok, that’s the rest of object oriented programming covered. And functional programming, which they never taught me twenty years ago, but I learned about it from a couple of younger graduates in the same place we met, a bar at a Silicon Milkroundabout careers event.

And let’s be honest, for most of your career you’ll be copying, pasting, and slightly modifying code from the current codebase or from the internet and will only ever talk about object oriented or functional programming in job interviews, or at the bar.

Right, now you are ready to use React. Now smarter people than I can tell you whether React is object oriented, functional, prototypical, or following some other paradigm or some bastardisation of them all (reactive?).

**Edit: 2019/05/10** – I spoke to one of those nice Finish guys at the tech consultancy Futurice. It _**is**_ reactive. Which, the Fin and I discussed. (Turns out since the demise of the Nokia 3210 phone, the Fins who were made redundant haven’t disappeared, but have been busy setting up tech consultancies amongst other things.) The Fin and I reckoned Reactive is probably what a white bearded developer I met at a tech event in Croydon said when I explained React to him: a re-hasing of an old idea – the [Observer Pattern](http://wiki.c2.com/?ObserverPattern). But, as the Fin said, it’s [Observer Pattern](http://wiki.c2.com/?ObserverPattern) for the fashionable Functional Programming Paradigm, because functions are easy to test, but you end up with a lot of them and it gets complicated, so you need Reactive. Alvin… it doesn’t matter if you don’t understand any of this paragraph up to this point. Just be aware, that just because an idea in technology is old, you don’t have to automatically reject it, like a [teenager](https://www.infoq.com/articles/agile-teenage-crisis) rejects old ideas. Even if a lot of your co-workers _**are**_ teenagers, prodigies, or Mark Zuckerberg.

But I think most people would agree that react is built up of components.

This is a good thing.

It means you can work on one thing, a big blue submit button for example, with less of a chance of accidentally breaking another button, or breaking the whole app, or launching a nuke, or loosing $100,000 dollars a second by changing the [powerpeg variable](https://dougseven.com/2014/04/17/knightmare-a-devops-cautionary-tale/).

In theory your components won’t have global variables or side effects. In reality they will probably have some global things, like the particular shade of red the marketing department wants you to use for the company logo.

If you are lucky they will actually provide you with a standard # hex code, but equally you might get a various similar, but not exactly the same colours from different designers, marketers, managers, in CMY – which is designed for printing and has no agreed way to display on screen. You’ll also get a ton of different but almost exactly the same shades of grey. These are your global variables. Try and keep them to a minimum, hopefully no-one’s life will depend on it, unless you work in advertising, in which case someone probably has had stomach ulcer over that shade of red at some point.

At this point it is important to remember that nailing down an exact colour is both technically easy, (but office politically difficult,) and it’s not that important to customers, because it’s all relative, changes depending on the printer used, light in the room, [a blue and black dress looks gold and white](https://en.wikipedia.org/wiki/The_dress#/media/File:The_Dress_\(viral_phenomenon\).png), etc. Unless you are colour blind. In which case a green button for a save button and a red button for a delete button look the same. Also a red button for self-destruct the nuclear power station will look the same. (So you may want to put different beer taps on identical power station buttons to stop that happening, see [The Design of Everyday Things](https://en.wikipedia.org/wiki/The_Design_of_Everyday_Things) book by Don Norman. (Professor and director of the Design Lab at the University of California, San Diego and [former vice president at Apple](https://www.fastcompany.com/3053406/how-apple-is-giving-design-a-bad-name).)

, but that’s for another blog post on the weekend syllabus to MSc in Human-Centred Computer Systems and User Experience.

React… back to React. What does this have to do with React? Well…

## **The Holy Grail**

> “Play with Expo Snack.”

“Play with Expo Snack.” This was almost the reply I sent immediately to your text of “if you were to start react all over again what would you do?”.

It was the first thing that came to mind. Before I thought about it, and ended up writing the nebulous Winter 2018 series of blog posts up to this one.

Expo Snack is actually not even using straight React, it’s using React Native. But the basics are the same and it has some benefits, not least that you can edit code on your computer, and see the results on your phone, without pesky adjusting windows or swiping between desktops. And you can make cross-platform apps and websites with React Native for Web with the same code-base, but that’s a subject for another blog post.

See the button on the right that says something like ‘Tap to play’. Never press that. It rarely works, or you have to wait in a queue for ages and I think they limit your usage, so just get in the habit of using the ‘Run on your device’ button.

It works by you installing the Expo app on your phone, and then you scanning a QR code. For iOS, Expo Snack implies you can’t use QR codes. Ignore that. It’s just poorly worded. You can, you just need to open the official apple camera app (and not Expo app) and point it at the QR code.

Anyway, the a nice thing about Expo Snack is that it has a search bar on the right and a load of components that you can drag and drop into your code. Which illustrates my point about components. Except that it isn’t working any more, bollocks, but it’s probably for the best. So you’ll have to look at the gif halfway through [this blog post from last Summer 2017](https://blog.expo.io/sketch-a-playground-for-react-native-16b2401f44a2) instead.

Look! Someone dragging and dropping code around. Like magic. Slotting pieces together like Lego. This is the holy grail. Re-usable components. That do one thing each. That can work together. Without weird bugs, crashes, global variables or side-effects. Without headfuckery, without losing billions of dollars on the stock market in seconds, or blowing up Chernobyl.

Edit code visually, like slotting together Lego? Sadly React is not that. The closest I’ve seen (that actually works, and isn’t some bastard absolute positioned, un-semantic, hack, that won’t work on different sized screens) is Scratch for kids, [see this video on DK Findout!](https://www.dkfindout.com/uk/computer-coding/how-do-i-start-coding/) (a children’s encyclopaedia website I once worked on, I hope kids are reading that, and not this.)

Possibly we’ll never get to editing code visually because of paradigm shifts and [The Law of Leaky Abstractions](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/).

React isn’t the holy grail. But it’s close, and it’s in the right direction. See Jani Eväkallio’s talk on the [Future of UI Development](https://www.youtube.com/watch?v=HGf89S1N930).

## Look at the jigsaw puzzle box picture

I was also going to text you about looking at some decent open source React code. Personally I think before you do a jigsaw, you should look at the picture on the box. And likewise, before you code React, look at some quality React code, like [todoMVC](http://todomvc.com/), if it had a Redux or [apollo-graph-persist](https://slides.com/kadikraman/offline-first#/) version, but it looks like I’ll have to cover that in another post. You don’t have to understand the code. But just take a peek. Think of it as inspiration. Especially look back when you are having a bad day at work, and remind yourself that clean code does exist, somewhere, out there. I wish I’d known about todoMVC earlier, and that it was a cloud data driven multi-page thing, more like a real world website you might work on.

Actually something like that exists from [Thinkster here.](https://github.com/gothinkster/react-redux-realworld-example-app) Look at it, bathe in the sunlight. You’ll probably never get paid to make clean code like this, and neither will I. But it’s comforting to know it’s out there.

## Things to do instantly

Also, here’s a list of things to do instantly, this list should be like sucking eggs to you, and if you haven’t done any of them, do them now:

-   Read the [React page on Wikipedia](https://en.wikipedia.org/wiki/React_\(JavaScript_library\))
-   [Read the basics of React on the official documentation website](https://reactjs.org/), but maybe just as far as doing the ‘Hello World’ tutorial. There are probably going to be better tutorials elsewhere after that.
-   Follow key players in React on twitter, [Dan Abranov](https://twitter.com/dan_abramov), [Jani Eväkallio](https://twitter.com/jevakallio), the [guy who built twitter mobile web site](http://Nicolas Gallagher), etc.
-   Learn about Javascript ES6 arrow functions
-   Install Microsoft’s VS Code, and install the Priettier and ESLint extensions
-   Read [Hacker News](https://news.ycombinator.com/) regularly

Also know that Javascript improv is a thing (but more on that in a different blog post):

> Many many days ago…  
> A foolish young man by the name of [@ferrannp](https://twitter.com/ferrannp?ref_src=twsrc%5Etfw) made a deal with the devil.  
> "If I get 1000 followers, @ken\_wheeler can punch me in the face. He's halfway around the world, surely, we'll never meet…"  
>   
> I give you the finale of [#componentDidSmoosh](https://twitter.com/hashtag/componentDidSmoosh?src=hash&ref_src=twsrc%5Etfw) [pic.twitter.com/vlXNac0AOQ](https://t.co/vlXNac0AOQ)
> 
> — eli (@elibelly) [November 30, 2018](https://twitter.com/elibelly/status/1068597896457715712?ref_src=twsrc%5Etfw)
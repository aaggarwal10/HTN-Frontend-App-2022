This project is being hosted on [htn.anishaggarwal.ca](https://htn.anishaggarwal.ca/), so please head there for a live demo.

## Part 2: Writeup

1. Alternately compared to my frontend submission last year, this year I tried to go at it from more of a hacker perspective thinking of what I would like to see in a schedule for a hackathon. For me, the biggest thing that I wanted to be able to do, was keep track of events I was interested in and bookmark them so I can easily make a schedule that fits me. So this year, I tried to add my own unique bonus perspective to the requirements requested. From there, I decided to use a list type display architecture (also I could not find a great calendar frameworkd 😞 ) to allow for more customizability. The following are the tools I used for this project and an explanation explaining why: 
    <ol type='a'>
        <li> <b>Next.js (React):</b> I used the the Next.js framework due to my previous experience in it with UWBlueprint, and my co-op internship. Furthermore, through the HTN Openhouse, I learned that HTN team frontend seems to be using Next.js currently. Furthermore, I was thinking of using modal components that I am used to making for the list architecture so that users can click on items and have an information modal pop up. </li>
        <li> <b>Chakra (UI Library):</b> I used this tool mainly for speed. I have familiarity using Chakra UI to make Frontend components, and through its different UI components from Buttons to layout components like SimpleGrid, I was able to quickly put together the logic to create the UI.  </li>
        <li> <b> Apollo Client (GQL Client) </b>: Used to request data from GrqphQL Endpoint provided. Not really much to say, it is a simple and easy method to request the data and a tool I had experience using. Hence, I was able to use more of the time for designing the Frontend. </li>
        <li><b>React-Multi-Carousel (UI Library):</b> I used this library to design a related events carousel. For me, personally, I would like to be able to see various different related events to go too at the same time, so I can compare them to see which is the best one to go to. Hence, I used this library to build a quick & asthetic carousel to allow users to scroll through related events to compare them to the selected one.</li>
    </ol>
    </br>
    In terms of errrors that I came across, there were a few, but the largest one had to do with a mismatch of hook calls in React. Specifically, the error was "Warning: React has detected a change in the order of hooks called by EventDisplayModal." At first, this problem did not seem to make sense since I followed the best practices for creating hooks by declaring them all at the top level. However, instead of looking for the reason of this specific error, I decided to simplify the issue by shrinking the error stack. At this point, I had the wrapped the modal on a child where the child would be able to open the modal. This caused a deeper call stack stemming from the child. Instead, I abstracted the opening to the parent component of the modal which made the modal not become dependent on the children. After running the application this way, the error was really an infinite hook call, which was much easier to solve. I think the process of narrowing the problem down and shortening the error stack really helped me solve this problem in less time that it would have taken from chasing the original error message call stack. It also made the code a lot cleaner.
    </br> </br>
    At the end of the project, I am not really proud of any specific detail, but more about how the entire thing came together to include more features than the required features, and the fact that I truly believe these new features would be very helpful to hackers on a virtual event. Overall, here are the bonus features I added beyond the requirements (all requirements were met):
    <ol type='a'>
        <li><b>Light Mode / Dark Mode Toggle:</b> As a developer, I strongly feel that dark mode is the best mode for most applications, but as I know other people may have their own preferences as I do, I decided to include this as a feature. P.S. this was my first feature so I could keep my eyes looking at the application without having to use an extension that would change how the app looked.</li>
        <li><b>Event Type-Based Filter & Search:</b> Allowed different tabs to view the three types of events. Furthermore, the different events all colour-coded and a quick toggle through the different tabs will allow users to quickly understand which colour is for which type event. Furthermore, a search bar is added to allow users to search for a specific event by its title (uses substring based searching).</li>
        <li><b>Progressive Web Application (PWA):</b> Made application into a progressive web app, as it allows for easy & quick access from any device. Used <i>next-pwa</i> as standard to quickly make the application a PWA.</li>
        <li><b>Persistence of Various Properties (Login Status, Filter, Light/Dark Mode, Events Attendance):</b> I made most of the important data persistent through local storage so a refresh does not erase all of the settings / preferences a user has. The settings all listed above, and I think the most important one is keeping track of the attendance of events, as losing all the carefully picked events that a user has stored would be bad.</li>
        <li><b>Attendance Filter & Selection:</b> Finally, the entire application started with this idea of an attendance filter & selection to allow hackers to make their own schedule at or before the beginning of the hackathon. I really believe in the importance of this feature, and in fact the idea I would have developed with more time stems from this feature. It is describe in #2.</li>
    </ol>
2. Given additional time on this project, I would like to add a new feature that utilizes the attendance selection to a new bound. I would like to add a new small chart of (3 - 4 items max) that shows the upcoming events highlighting the ones that the user is attending. This chart would have a count down timer allowing the hacker to know exactly what events he should be prepared for after he has created the attendance list and schedule at the beginning of the hackathon. Furthermore, I would like to connect this attendance data to the hacker's phone / email along with a website notification that notifies him 5 minutes before an event he has chosen to attend starts. Hence, after making his own personal calendar, he can continue working hard at hacking being fully confident that he will not miss the events he was interested in. Finally, it would also be amazing to allow him to share his calendar of events with others on his team, so they will know what events and time periods the hacker plans to use for events. They can plan around them while also maybe joining the hacker on events they also have interest in. Overall, I think the interaction through notifications and sharing of the calendar of events would bring the entire system of attendence together. This attendance list can also be used by the organizing team to understand the approximate amount of space each event will need ahead of time as well as other useful statistics such as workshop interest. Overall, this was what I believe would be a great product for the hypothetical Global Hackathon Incorporated. I believe being a part of the real Global Hackathon Inc. organizing team will bring more ideas from other organizers that make an even more amazing app than I have envisioned.
3. For final thoughts, I have to say thank you to the organizing team for setting up this frontend coding challenge to be the same as last year. At the beginning, I thought the developer team was being lazy by just using the same project again. However, at the end of this project, I have learned how much I improved in web development compared to last year. Last year, I used Vue.js and had no idea about most of the technology (i.e. GraphQL, React, etc.) listed on the project. Furthermore, I only completed the bare basic requirements requested by the project. However, this year I have a good understanding of most of the technology listed (I was even able to use two technolgies that I had no clue about last year), and I was able to implement the basic requirements along with multiple "bonus" features. This has let me understand my progress, while also showing me that I still have much to learn (cannot make my own calendar component in small time frame 😞). 

<b>🙏 Thank you very much for this experience and also for your time and consideration in evaluating this project. 🙏 </b>

<b>P.S. If possible, please email me at anish@anishaggarwal.ca any improvements or tips you have for future projects. It would be much appreciated. </b>
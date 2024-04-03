To use the chat application please:
Open the terminal
Type in 
cd CA4; node index.js
Click the down arrow next to project index.
Click box url.
Change the 3000 to 5000 inside the url that showed up.
Click on the chat application in the nav bar. 
To finish. Click Control C in the terminal 
To see typing indicartos as well as joining and leaving please open a few tabs and type a few lettters in each, you will see that it shows what other users are typing 
Report: 
The chat application uses sockets. I faced many challenges when trying to develop the chat interface. Initially, I thought I would use the pre-existing code, newmessage(), however, when I did this, it would relay the entire information every time a new person would join. Instead, I used code to print it locally, without having anything to do with the server. To combat the same person popping up again, I used a test to see whether a person was already in the list. I introduced the typing function; I had to show what other users were typing. I implemented a function where if a key is tapped, a timer is set. As for the typing indicator, it doesn't make sense or look good if it was on/off for every key, therefore it starts a timer for 2 seconds so that if they keep typing, the indicator will continue to be there. I encountered an issue where at first, even if two people were typing, only one would display. I then also discovered an issue once I fixed it that you could see if you yourself were typing which is redundant and counterintuitive. 

Next, I implanted a navigation bar, and I encountered many issues. First, I had to correctly move the chat app down under the navigation bar. I encountered many issues with importance of CSS. It seemed impossible to adjust it. I realize now that the CSS looks like a complete mess… then once I managed to move everything to the right place, the padding was completely wrong. I had to adjust the navbar specifically for the chat.html page. I then went through and simplified and cleaned up my code for proper indentation and CSS styling. I then proceeded to start adding content from my portfolio, which I think is presented well. 

Overall, I believe this assignment was a good exploration of CSS, html, and socket, which I have not previously used. In the future I would carefully plan out my CSS implementation, perhaps drawing out a plan so that I can see what is affecting what. This was the most tedious part of the process. I would also add mobile device implementation using Bootstrap. Despite all the challenged I am quite happy with how the website has turned out. 

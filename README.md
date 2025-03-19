# MSHackathon-ROI-Insights

chat is our main method of interaction with the AI, it talks to us like a change management expert might, it puts on different hats to help us work out any issues we are facing etc
for all other tabs/components, the beauty is that not only can the be generated, but that data feeds back to improve the context
like the understanding that the ai has of our project

ROI we can put numbers in and it will tell us insights
or we can tell it to "guess" numbers as a simulation
realistically most companies would calculate ROI in a proper spreadsheet, which our app supports as well. but the roi interface is for ease of access
esp cuz current models can be a hit or miss when it comes to chart generation

Analyze
Actually a lot of the elements in our code are designed due to the limitations of llm apis
these tools are often chained with other tools to achieve code execution. like the latest models can show you graphs by generation python code and running it, which is like using a sledgehammer to crack a nut. we dont have acces to the latest models

our work around solution

our philosophy is to let ai do what its good at (generate text) and we handcode the framework for the generated csv/json/markdown tables
thats the purpose of our analyze page, which makes use of the mermaid api to display markdown files
we have preloaded popular business strategy frameworks but custom frameworks are also available
and ai can help users generate these custom frameworks
as well as the content to fill the frameworks

Research
the research page is straightforward, but keep in mind that this research on news and similar case studies is an input as well as an output
it helps to ground our context in reality and give better advice based on similar cases and current events. 

and the kanban produces actionable items
bridge gap to reality
its ai powered kanban (planning)
and maybe we can work in that it is good for collaboration
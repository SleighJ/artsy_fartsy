
README

Artsy_Fartsy Meme Creator

The file labeled ‘src’ is where you will find the majority of the meat in the project. Its file structure is broken into four categories.

	1. Containers
	2. Components
	3. SubComponents
	4. Static

‘Containers’ are parenting components in which Containers, Components, and SubComponents  are nested. ‘SubComponents’ are simple components used to control the values of their corresponding component, such as picking a color or brush stroke. Static files are either files containing JS functions or arrays storing colors and fonts.

Application Container:

This container is used primarily for communication purposes between the Sidebar and its subComponents and the Components.

	1. SideBar 
	2. CanvasContainer

CanvasContainer:

This container holds the more complex logic filled components and manages some logic between them.

	1. Background: 
		This component parses a file into base64 so the user can crop the image 				
		to their liking. The cropped base64 image is then posted to a firebase database 				
		and given a url for rendering.
	2. Text:
		This component is heavily comprised of click-handlers. It allows the user to
		manipulate the text through the information passed in the click events. This 				
		component allows the user to change the font, size, and positioning of the text.
	3. Canvas
		This component is what allows the user to draw using the <canvas> 					
		element. This component will eventually handle the logic for saving the user’s 				
		work.


SideBar:

This container holds the subComponents. SubComponents are used to change the values of the components which ultimately render something on the screen.

	1. Palette
		Pick your favorite color.. Or your least favorite..
	2. Brushes
		Pick a brush stroke width
	3. BackgroundSubComponent
		Upload a file of your friends lookin’ real weird -  or lookin good.. even tho thats no fun.
	4. TextSubComponent
		Add text over your friends face, really drive that point home.


Getting Started: 

Open a console and navigate into the artsy_fartsy project file. 

1. Once in the project file,

    $ npm i --save 

	$ node server

2. Open another console, navigate into artsy_fartsy project file,
	
	$ npm start
	
    (after prompt to start server on 4001)
    
	$ y

3. Turn things your friends say into Memes. 
4. Share, so the world can point the finger and laugh.

Development Notes:

    1. Drag text handler needs work
    2. Save functionality has not been added
    3. Remove text functionality has not been added
    4. Edit text functionality has not been added
    5. Text is not being appended to the actual canvas element, which messes with resizing
    6. Only background format currently supported is .png

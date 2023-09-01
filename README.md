# Merntodo
#first i create my backend using express jss,mongodb.
#than i form mvc structure for todocrud operation
mvc means :model view controller
#in model we define the type of mine data whethere its should be in string or boolean
soo in model i define #title :as string #completed :as defult it is false i had put for checkbox in frontend to show completed
#routes i had create all routes that perform crud operation like put,delete,post,get;
in index.js file i had call the routes connect with mine port .

#frontend
there are two components in frontend in which i had made addTodo.jsx where post request made and payload i am passing from frontend to backend and key you pass in backend in models its should be shame otherwise its shows error.I used axios for post request.

#Gettodo.jsx componets here i had made to perform get request to and than as i had made one useState to save data  which is an array empty box and there two state [data,ons is setData function soo while making get request using axios, i save the res in setData function . now i had map the res present in data and  in mapping there is checkbox which is i am getting the completed data from which i had defined and handledelte and handleedit  soo in that directly paasing an id in both and delete the data and in edit we need to pass once again a payload to edt the title.soo here also you need to pass key same as it in backend.

#spinner i used here in addtask button .
#i used react js and material ui for css .

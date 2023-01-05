import { async } from "regenerator-runtime"
import { API_URL, RES_PER_PAGE, KEY} from "./config.js";
// import { getJSON } from "./helper.js";
// import { sendJSON } from "./helper.js";
import { AJAX } from "./helper.js";

export const state = {   //create a state object, and export it
    recipe : {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RES_PER_PAGE,
        page: 1 //default page num
    },
    bookmarks:[],
    numOfRecipes : 0, //default is 0
    listPosition : 0  //default  0
}

const createRecipeObject = function (data) {
  
  const {recipe} = data.data 

  return {  
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceURL: recipe.source_url,
    image:recipe.image_url,
    servings:recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && {key: recipe.key}) //tricky, if true, it will add key : recipe.key
  }      
}

/**
 * When we click on an element that contains a recipe link, or when a recipe URL is pasted in the address bar, this method will make an AJAX call.
 * @param {String} id #hash from the URL
 * @returns nothing. It will load a new recipe and store it in the state variable
 */

export const loadRecipe = async function (id){ 
    // console.log(`Individual recipe id: ${id}`); 
        //this f(x) will not return anything, it will just modify the recipe key in the state object that we are exporting    
    try{         
        const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
        // const data = await new Promise (function(resolve,reject){
        //   setTimeout(function() {
        //     let mockData = {"status":"success","results":59,"data":{"recipes":[{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg","title":"Cauliflower Pizza Crust (with BBQ Chicken Pizza)","id":"5ed6604591c37cdc054bcd09"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg","title":"Cauliflower Pizza Crust (with BBQ Chicken Pizza)","id":"5ed6604591c37cdc054bcc13"},{"publisher":"Simply Recipes","image_url":"http://forkify-api.herokuapp.com/images/pizza292x2007a259a79.jpg","title":"Homemade Pizza","id":"5ed6604591c37cdc054bcb34"},{"publisher":"Simply Recipes","image_url":"http://forkify-api.herokuapp.com/images/howtogrillpizzad300x20086a60e1b.jpg","title":"How to Grill Pizza","id":"5ed6604591c37cdc054bcb37"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Pizza2BDip2B12B500c4c0a26c.jpg","title":"Pizza Dip","id":"5ed6604591c37cdc054bcac4"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/391236ba85.jpg","title":"Veggie Pizza","id":"5ed6604591c37cdc054bca5d"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/7988559586.jpg","title":"Valentine Pizza","id":"5ed6604591c37cdc054bca57"},{"publisher":"A Spicy Perspective","image_url":"http://forkify-api.herokuapp.com/images/IMG_4351180x1804f4a.jpg","title":"Greek Pizza","id":"5ed6604591c37cdc054bca3b"},{"publisher":"My Baking Addiction","image_url":"http://forkify-api.herokuapp.com/images/PizzaDip21of14f05.jpg","title":"Pizza Dip","id":"5ed6604591c37cdc054bca10"},{"publisher":"BBC Good Food","image_url":"http://forkify-api.herokuapp.com/images/1649634_MEDIUMd3fc.jpg","title":"Pitta pizzas","id":"5ed6604591c37cdc054bc990"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/5100898cc5.jpg","title":"Pizza Casserole","id":"5ed6604591c37cdc054bc96e"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/567c8fe.jpg","title":"Pizza Pinwheels","id":"5ed6604591c37cdc054bc971"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/104254d419.jpg","title":"Pesto Pizza","id":"5ed6604591c37cdc054bc958"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/636003da23.jpg","title":"Hummus Pizza","id":"5ed6604591c37cdc054bc8fd"},{"publisher":"BBC Good Food","image_url":"http://forkify-api.herokuapp.com/images/679637_MEDIUM765c.jpg","title":"Puff pizza tart","id":"5ed6604691c37cdc054bd0c0"},{"publisher":"What's Gaby Cooking","image_url":"http://forkify-api.herokuapp.com/images/PizzaMonkeyBread67f8.jpg","title":"Pizza Monkey Bread","id":"5ed6604691c37cdc054bd0bc"},{"publisher":"Epicurious","image_url":"http://forkify-api.herokuapp.com/images/51150600f4cb.jpg","title":"Veggi-Prosciutto Pizza","id":"5ed6604591c37cdc054bcfb2"},{"publisher":"My Baking Addiction","image_url":"http://forkify-api.herokuapp.com/images/BBQChickenPizza3e2b.jpg","title":"Barbecue Chicken Pizza","id":"5ed6604591c37cdc054bcfcc"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/pizza3464.jpg","title":"Pizza Potato Skins","id":"5ed6604591c37cdc054bcebc"},{"publisher":"Two Peas and Their Pod","image_url":"http://forkify-api.herokuapp.com/images/minifruitpizzas52c00.jpg","title":"Mini Fruit Pizzas","id":"5ed6604591c37cdc054bce0d"},{"publisher":"Bon Appetit","image_url":"http://forkify-api.herokuapp.com/images/nokneadpizzadoughlahey6461467.jpg","title":"No-Knead Pizza Dough","id":"5ed6604591c37cdc054bcd86"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/grilledveggie79bd.jpg","title":"Grilled Veggie Pizza","id":"5ed6604591c37cdc054bcc7e"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/4797377235_c07589b7d4_be953.jpg","title":"Mexican “Flatbread” Pizza","id":"5ed6604591c37cdc054bccb2"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/pizzaburgera5bd.jpg","title":"Pepperoni Pizza Burgers","id":"5ed6604591c37cdc054bcc40"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/burger53be.jpg","title":"Supreme Pizza Burgers","id":"5ed6604591c37cdc054bcc3e"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Taco2BQuesadilla2BPizza2B5002B4417a4755e35.jpg","title":"Taco Quesadilla Pizzas","id":"5ed6604591c37cdc054bcae1"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/580542e3ec.jpg","title":"Hot Pizza Dip","id":"5ed6604591c37cdc054bc8f7"},{"publisher":"Lisa's Kitchen","image_url":"http://forkify-api.herokuapp.com/images/hummus_pizza25f37.jpg","title":"Homemade Spicy Hummus Pizza","id":"5ed6604691c37cdc054bd0d4"},{"publisher":"My Baking Addiction","image_url":"http://forkify-api.herokuapp.com/images/PizzaDough1of12edit5779.jpg","title":"Simple No Knead Pizza Dough","id":"5ed6604691c37cdc054bd07c"},{"publisher":"Chow","image_url":"http://forkify-api.herokuapp.com/images/30624_RecipeImage_620x413_pepperoni_pizza_dip_4774d.jpg","title":"Pepperoni Pizza Dip Recipe","id":"5ed6604691c37cdc054bd034"},{"publisher":"What's Gaby Cooking","image_url":"http://forkify-api.herokuapp.com/images/PizzaHandPie4e08.jpg","title":"Pepperoni Pizza Hand Pies","id":"5ed6604691c37cdc054bd016"},{"publisher":"What's Gaby Cooking","image_url":"http://forkify-api.herokuapp.com/images/IMG_15866d21.jpg","title":"Grilled BBQ Chicken Pizza","id":"5ed6604691c37cdc054bd015"},{"publisher":"Whats Gaby Cooking","image_url":"http://forkify-api.herokuapp.com/images/IMG_98428b96.jpg","title":"Loaded Veggie and Prosciutto Pizza","id":"5ed6604591c37cdc054bcf8d"},{"publisher":"BBC Good Food","image_url":"http://forkify-api.herokuapp.com/images/2150654_MEDIUM6068.jpg","title":"Pizza bianco with artichoke hearts","id":"5ed6604591c37cdc054bcf7e"},{"publisher":"Vintage Mixer","image_url":"http://forkify-api.herokuapp.com/images/CauliflowerPizzaCrustRecipe06fdc.jpg","title":"Cauliflower Pizza Crust Recipe","id":"5ed6604591c37cdc054bcf09"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/fruitpizza9a19.jpg","title":"Deep Dish Fruit Pizza","id":"5ed6604591c37cdc054bcc5b"},{"publisher":"101 Cookbooks","image_url":"http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg","title":"Best Pizza Dough Ever","id":"5ed6604591c37cdc054bcd07"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/4364270576_302751a2a4f3c1.jpg","title":"PW’s Favorite Pizza","id":"5ed6604591c37cdc054bccbd"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/steakhousepizza0b87.jpg","title":"One Basic Pizza Crust","id":"5ed6604591c37cdc054bcc76"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/5278973957_3f9f9a21c2_o7a1b.jpg","title":"Fig-Prosciutto Pizza with Arugula","id":"5ed6604591c37cdc054bcc72"},{"publisher":"Real Simple","image_url":"http://forkify-api.herokuapp.com/images/pizza_30061a5d763.jpg","title":"Salami and Brussels Sprouts Pizza","id":"5ed6604591c37cdc054bcc08"},{"publisher":"Real Simple","image_url":"http://forkify-api.herokuapp.com/images/pizza_300d938bd58.jpg","title":"English-Muffin Egg Pizzas","id":"5ed6604591c37cdc054bcbc1"},{"publisher":"BBC Good Food","image_url":"http://forkify-api.herokuapp.com/images/1813674_MEDIUM6f4a.jpg","title":"Salami &amp; peppadew pizza","id":"5ed6604591c37cdc054bcb6e"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Pizza2BQuesadillas2B2528aka2BPizzadillas25292B5002B834037bf306b.jpg","title":"Pizza Quesadillas (aka Pizzadillas)","id":"5ed6604591c37cdc054bcac5"},{"publisher":"What's Gaby Cooking","image_url":"http://forkify-api.herokuapp.com/images/PepperoniPizzaMonkeyBread8cd5.jpg","title":"Pepperoni Pizza Monkey Bread","id":"5ed6604591c37cdc054bca36"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/191121d99d.jpg","title":"Fast English Muffin Pizzas","id":"5ed6604591c37cdc054bc8b7"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/100111309d9.jpg","title":"Double Crust Stuffed Pizza","id":"5ed6604591c37cdc054bc89a"},{"publisher":"Two Peas and Their Pod","image_url":"http://forkify-api.herokuapp.com/images/peachbasilpizza6c7de.jpg","title":"Peach, Basil, Mozzarella, & Balsamic Pizza","id":"5ed6604591c37cdc054bce32"},{"publisher":"Two Peas and Their Pod","image_url":"http://forkify-api.herokuapp.com/images/avocadopizzawithcilantrosauce4bf5.jpg","title":"Avocado Pita Pizza with Cilantro Sauce","id":"5ed6604591c37cdc054bce0f"},{"publisher":"Bon Appetit","image_url":"http://forkify-api.herokuapp.com/images/figandgoatcheesepizzawitharugula646698d.jpg","title":"Fig and Goat Cheese Pizza with Arugula","id":"5ed6604591c37cdc054bcd81"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/4433733640_8b0a5d19fbace0.jpg","title":"CPK’s BBQ Chicken Pizza","id":"5ed6604591c37cdc054bccbc"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Avocado2Band2BFried2BEgg2BBreakfast2BPizza2B5002B296294dcea8a.jpg","title":"Avocado Breakfast Pizza with Fried Egg","id":"5ed6604591c37cdc054bca79"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/237891b5e4.jpg","title":"Jay’s Signature Pizza Crust","id":"5ed6604591c37cdc054bc90b"},{"publisher":"My Baking Addiction","image_url":"http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg","title":"Spicy Chicken and Pepper Jack Pizza","id":"5ed6604591c37cdc054bc886"},{"publisher":"Real Simple","image_url":"http://forkify-api.herokuapp.com/images/20meals14_30007e78232.jpg","title":"Artichoke Pizzas With Lemony Green Bean Salad","id":"5ed6604591c37cdc054bcba5"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Thai2BChicken2BPizza2Bwith2BSweet2BChili2BSauce2B5002B435581bcf578.jpg","title":"Thai Chicken Pizza with Sweet Chili Sauce","id":"5ed6604591c37cdc054bcae5"},{"publisher":"Two Peas and Their Pod","image_url":"http://forkify-api.herokuapp.com/images/sweetpotatokalepizza2c6db.jpg","title":"Sweet Potato Kale Pizza with Rosemary & Red Onion","id":"5ed6604591c37cdc054bce26"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Strawberry2BBalsamic2BPizza2Bwith2BChicken252C2BSweet2BOnion2Band2BSmoked2BBacon2B5002B300939d125e2.jpg","title":"Balsamic Strawberry and Chicken Pizza with Sweet Onions and Smoked Bacon","id":"5ed6604591c37cdc054bca85"},{"publisher":"Jamie Oliver","image_url":"http://forkify-api.herokuapp.com/images/395_1_1350903959_lrgdd8a.jpg","title":"Egg, prosciutto, artichokes, olives, mozzarella, tomato sauce &amp; basil pizza topping","id":"5ed6604591c37cdc054bcf3a"}]}};
        //     let recipe = mockData.data.recipes.filter(item => item.id === id);
        //     const data = {"status":"success","data":{"recipe":{"publisher":"Simply Recipes","ingredients":[{"quantity":1.5,"unit":"cups","description":"warm water"},{"quantity":1,"unit":"","description":"package of active dry yeast"},{"quantity":3.5,"unit":"cups","description":"bread flour"},{"quantity":2,"unit":"tbsps","description":"olive oil"},{"quantity":2,"unit":"tsps","description":"salt"},{"quantity":1,"unit":"tsp","description":"sugar"},{"quantity":null,"unit":"","description":"Olive oil"},{"quantity":null,"unit":"","description":"Cornmeal"},{"quantity":null,"unit":"","description":"Tomato sauce"},{"quantity":null,"unit":"","description":"Mozzarella or parmesan cheese shredded"},{"quantity":null,"unit":"","description":"Feta cheese"},{"quantity":null,"unit":"","description":"Mushrooms thinly sliced"},{"quantity":null,"unit":"","description":"Bell peppers stems and seeds removed thinly sliced"},{"quantity":null,"unit":"","description":"Italian sausage cooked ahead"},{"quantity":null,"unit":"","description":"Chopped fresh basil"},{"quantity":null,"unit":"","description":"Pesto"},{"quantity":null,"unit":"","description":"Pepperoni thinly sliced"},{"quantity":null,"unit":"","description":"Onions thinly sliced"},{"quantity":null,"unit":"","description":"Sliced ham"},{"quantity":null,"unit":"","description":"A pizza stone highly recommended if you want your pizza dough to be crusty"},{"quantity":null,"unit":"","description":"A pizza peel or a flat baking sheet"},{"quantity":null,"unit":"","description":"A pizza wheel for cutting the pizza not required but easier to deal with than a knife"}],"source_url":"http://www.simplyrecipes.com/recipes/homemade_pizza/","image_url":"http://forkify-api.herokuapp.com/images/pizza292x2007a259a79.jpg","title": recipe[0].title,"servings":4,"cooking_time":135,"id":recipe[0].id}}};
        //     resolve(data);
        //   }, 5)
        // })
        
        state.recipe = createRecipeObject(data);
        //we create a bookmark in state.recipe ! 
        if (state.bookmarks.some(bookmark => bookmark.id === id)) {
          state.recipe.bookmarked = true;
        } else {
          state.recipe.bookmarked = false;
        }

        // const arrID = []; 
        // state.search.results.forEach(element => {
        //   arrID.push(element.id);
        // })
        // console.log(arrID.indexOf(state.recipe.id));
        // state.listPosition = arrID.indexOf(state.recipe.id);        
        
    } catch (err){        
        console.error(`${err} 🔥!🔥!🔥`); // log error       
        throw err; //propagate the error back to controller.js (where the f(x) is invoked)
    }
}

export const loadSearchResults = async function (query) {
  try {
    let data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`); //query is the word that we are searching for in his API    
    
    // const data = await new Promise (function(resolve,reject){
    //   setInterval(function(){
    //     const data = {"status":"success","results":59,"data":{"recipes":[{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg","title":"Cauliflower Pizza Crust (with BBQ Chicken Pizza)","id":"5ed6604591c37cdc054bcc13"},{"publisher":"Simply Recipes","image_url":"http://forkify-api.herokuapp.com/images/pizza292x2007a259a79.jpg","title":"Homemade Pizza","id":"5ed6604591c37cdc054bcb34"},{"publisher":"Simply Recipes","image_url":"http://forkify-api.herokuapp.com/images/howtogrillpizzad300x20086a60e1b.jpg","title":"How to Grill Pizza","id":"5ed6604591c37cdc054bcb37"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Pizza2BDip2B12B500c4c0a26c.jpg","title":"Pizza Dip","id":"5ed6604591c37cdc054bcac4"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/391236ba85.jpg","title":"Veggie Pizza","id":"5ed6604591c37cdc054bca5d"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/7988559586.jpg","title":"Valentine Pizza","id":"5ed6604591c37cdc054bca57"},{"publisher":"A Spicy Perspective","image_url":"http://forkify-api.herokuapp.com/images/IMG_4351180x1804f4a.jpg","title":"Greek Pizza","id":"5ed6604591c37cdc054bca3b"},{"publisher":"My Baking Addiction","image_url":"http://forkify-api.herokuapp.com/images/PizzaDip21of14f05.jpg","title":"Pizza Dip","id":"5ed6604591c37cdc054bca10"},{"publisher":"BBC Good Food","image_url":"http://forkify-api.herokuapp.com/images/1649634_MEDIUMd3fc.jpg","title":"Pitta pizzas","id":"5ed6604591c37cdc054bc990"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/5100898cc5.jpg","title":"Pizza Casserole","id":"5ed6604591c37cdc054bc96e"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/567c8fe.jpg","title":"Pizza Pinwheels","id":"5ed6604591c37cdc054bc971"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/104254d419.jpg","title":"Pesto Pizza","id":"5ed6604591c37cdc054bc958"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/636003da23.jpg","title":"Hummus Pizza","id":"5ed6604591c37cdc054bc8fd"},{"publisher":"BBC Good Food","image_url":"http://forkify-api.herokuapp.com/images/679637_MEDIUM765c.jpg","title":"Puff pizza tart","id":"5ed6604691c37cdc054bd0c0"},{"publisher":"What's Gaby Cooking","image_url":"http://forkify-api.herokuapp.com/images/PizzaMonkeyBread67f8.jpg","title":"Pizza Monkey Bread","id":"5ed6604691c37cdc054bd0bc"},{"publisher":"Epicurious","image_url":"http://forkify-api.herokuapp.com/images/51150600f4cb.jpg","title":"Veggi-Prosciutto Pizza","id":"5ed6604591c37cdc054bcfb2"},{"publisher":"My Baking Addiction","image_url":"http://forkify-api.herokuapp.com/images/BBQChickenPizza3e2b.jpg","title":"Barbecue Chicken Pizza","id":"5ed6604591c37cdc054bcfcc"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/pizza3464.jpg","title":"Pizza Potato Skins","id":"5ed6604591c37cdc054bcebc"},{"publisher":"Two Peas and Their Pod","image_url":"http://forkify-api.herokuapp.com/images/minifruitpizzas52c00.jpg","title":"Mini Fruit Pizzas","id":"5ed6604591c37cdc054bce0d"},{"publisher":"Bon Appetit","image_url":"http://forkify-api.herokuapp.com/images/nokneadpizzadoughlahey6461467.jpg","title":"No-Knead Pizza Dough","id":"5ed6604591c37cdc054bcd86"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/grilledveggie79bd.jpg","title":"Grilled Veggie Pizza","id":"5ed6604591c37cdc054bcc7e"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/4797377235_c07589b7d4_be953.jpg","title":"Mexican “Flatbread” Pizza","id":"5ed6604591c37cdc054bccb2"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/pizzaburgera5bd.jpg","title":"Pepperoni Pizza Burgers","id":"5ed6604591c37cdc054bcc40"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/burger53be.jpg","title":"Supreme Pizza Burgers","id":"5ed6604591c37cdc054bcc3e"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Taco2BQuesadilla2BPizza2B5002B4417a4755e35.jpg","title":"Taco Quesadilla Pizzas","id":"5ed6604591c37cdc054bcae1"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/580542e3ec.jpg","title":"Hot Pizza Dip","id":"5ed6604591c37cdc054bc8f7"},{"publisher":"Lisa's Kitchen","image_url":"http://forkify-api.herokuapp.com/images/hummus_pizza25f37.jpg","title":"Homemade Spicy Hummus Pizza","id":"5ed6604691c37cdc054bd0d4"},{"publisher":"My Baking Addiction","image_url":"http://forkify-api.herokuapp.com/images/PizzaDough1of12edit5779.jpg","title":"Simple No Knead Pizza Dough","id":"5ed6604691c37cdc054bd07c"},{"publisher":"Chow","image_url":"http://forkify-api.herokuapp.com/images/30624_RecipeImage_620x413_pepperoni_pizza_dip_4774d.jpg","title":"Pepperoni Pizza Dip Recipe","id":"5ed6604691c37cdc054bd034"},{"publisher":"What's Gaby Cooking","image_url":"http://forkify-api.herokuapp.com/images/PizzaHandPie4e08.jpg","title":"Pepperoni Pizza Hand Pies","id":"5ed6604691c37cdc054bd016"},{"publisher":"What's Gaby Cooking","image_url":"http://forkify-api.herokuapp.com/images/IMG_15866d21.jpg","title":"Grilled BBQ Chicken Pizza","id":"5ed6604691c37cdc054bd015"},{"publisher":"Whats Gaby Cooking","image_url":"http://forkify-api.herokuapp.com/images/IMG_98428b96.jpg","title":"Loaded Veggie and Prosciutto Pizza","id":"5ed6604591c37cdc054bcf8d"},{"publisher":"BBC Good Food","image_url":"http://forkify-api.herokuapp.com/images/2150654_MEDIUM6068.jpg","title":"Pizza bianco with artichoke hearts","id":"5ed6604591c37cdc054bcf7e"},{"publisher":"Vintage Mixer","image_url":"http://forkify-api.herokuapp.com/images/CauliflowerPizzaCrustRecipe06fdc.jpg","title":"Cauliflower Pizza Crust Recipe","id":"5ed6604591c37cdc054bcf09"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/fruitpizza9a19.jpg","title":"Deep Dish Fruit Pizza","id":"5ed6604591c37cdc054bcc5b"},{"publisher":"101 Cookbooks","image_url":"http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg","title":"Best Pizza Dough Ever","id":"5ed6604591c37cdc054bcd07"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/4364270576_302751a2a4f3c1.jpg","title":"PW’s Favorite Pizza","id":"5ed6604591c37cdc054bccbd"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/steakhousepizza0b87.jpg","title":"One Basic Pizza Crust","id":"5ed6604591c37cdc054bcc76"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/5278973957_3f9f9a21c2_o7a1b.jpg","title":"Fig-Prosciutto Pizza with Arugula","id":"5ed6604591c37cdc054bcc72"},{"publisher":"Real Simple","image_url":"http://forkify-api.herokuapp.com/images/pizza_30061a5d763.jpg","title":"Salami and Brussels Sprouts Pizza","id":"5ed6604591c37cdc054bcc08"},{"publisher":"Real Simple","image_url":"http://forkify-api.herokuapp.com/images/pizza_300d938bd58.jpg","title":"English-Muffin Egg Pizzas","id":"5ed6604591c37cdc054bcbc1"},{"publisher":"BBC Good Food","image_url":"http://forkify-api.herokuapp.com/images/1813674_MEDIUM6f4a.jpg","title":"Salami &amp; peppadew pizza","id":"5ed6604591c37cdc054bcb6e"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Pizza2BQuesadillas2B2528aka2BPizzadillas25292B5002B834037bf306b.jpg","title":"Pizza Quesadillas (aka Pizzadillas)","id":"5ed6604591c37cdc054bcac5"},{"publisher":"What's Gaby Cooking","image_url":"http://forkify-api.herokuapp.com/images/PepperoniPizzaMonkeyBread8cd5.jpg","title":"Pepperoni Pizza Monkey Bread","id":"5ed6604591c37cdc054bca36"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/191121d99d.jpg","title":"Fast English Muffin Pizzas","id":"5ed6604591c37cdc054bc8b7"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/100111309d9.jpg","title":"Double Crust Stuffed Pizza","id":"5ed6604591c37cdc054bc89a"},{"publisher":"Two Peas and Their Pod","image_url":"http://forkify-api.herokuapp.com/images/peachbasilpizza6c7de.jpg","title":"Peach, Basil, Mozzarella, & Balsamic Pizza","id":"5ed6604591c37cdc054bce32"},{"publisher":"Two Peas and Their Pod","image_url":"http://forkify-api.herokuapp.com/images/avocadopizzawithcilantrosauce4bf5.jpg","title":"Avocado Pita Pizza with Cilantro Sauce","id":"5ed6604591c37cdc054bce0f"},{"publisher":"Bon Appetit","image_url":"http://forkify-api.herokuapp.com/images/figandgoatcheesepizzawitharugula646698d.jpg","title":"Fig and Goat Cheese Pizza with Arugula","id":"5ed6604591c37cdc054bcd81"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/4433733640_8b0a5d19fbace0.jpg","title":"CPK’s BBQ Chicken Pizza","id":"5ed6604591c37cdc054bccbc"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Avocado2Band2BFried2BEgg2BBreakfast2BPizza2B5002B296294dcea8a.jpg","title":"Avocado Breakfast Pizza with Fried Egg","id":"5ed6604591c37cdc054bca79"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/237891b5e4.jpg","title":"Jay’s Signature Pizza Crust","id":"5ed6604591c37cdc054bc90b"},{"publisher":"My Baking Addiction","image_url":"http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg","title":"Spicy Chicken and Pepper Jack Pizza","id":"5ed6604591c37cdc054bc886"},{"publisher":"Real Simple","image_url":"http://forkify-api.herokuapp.com/images/20meals14_30007e78232.jpg","title":"Artichoke Pizzas With Lemony Green Bean Salad","id":"5ed6604591c37cdc054bcba5"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Thai2BChicken2BPizza2Bwith2BSweet2BChili2BSauce2B5002B435581bcf578.jpg","title":"Thai Chicken Pizza with Sweet Chili Sauce","id":"5ed6604591c37cdc054bcae5"},{"publisher":"Two Peas and Their Pod","image_url":"http://forkify-api.herokuapp.com/images/sweetpotatokalepizza2c6db.jpg","title":"Sweet Potato Kale Pizza with Rosemary & Red Onion","id":"5ed6604591c37cdc054bce26"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Strawberry2BBalsamic2BPizza2Bwith2BChicken252C2BSweet2BOnion2Band2BSmoked2BBacon2B5002B300939d125e2.jpg","title":"Balsamic Strawberry and Chicken Pizza with Sweet Onions and Smoked Bacon","id":"5ed6604591c37cdc054bca85"},{"publisher":"Jamie Oliver","image_url":"http://forkify-api.herokuapp.com/images/395_1_1350903959_lrgdd8a.jpg","title":"Egg, prosciutto, artichokes, olives, mozzarella, tomato sauce &amp; basil pizza topping","id":"5ed6604591c37cdc054bcf3a"}]}};
    //     resolve(data);
    //   },5);      
    // });
    
    state.search.query = query;
    state.numOfRecipes = data.data.recipes.length;    
    state.search.results = data.data.recipes.map(rcp => { //we will return a new array of objects, each object will have 4 properties
        return {
          id : rcp.id,
          title : rcp.title,
          publisher : rcp.publisher,
          image : rcp.image_url,          
          ...(rcp.key && {key: rcp.key})
      };
    });     

    state.search.page = 1;  //when we load new results, the page will set to 1 [default value]    
    console.log(`recipes found: `, state.search.results.length);
  } catch (err) {
    console.error(`${err} 🔥🚒`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {  //{if no arg, default value is 1}
  state.search.page = page //update the search.page property
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;    
  return state.search.results.slice(start,end); //slice the part from start to end
}

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingr => {
      ingr.quantity = ingr.quantity * newServings / state.recipe.servings;
      //newQuantity = oldQt * newServings/oldServings   [his formula, but we need to know how much food goes per person]      
  });
  state.recipe.servings = newServings;    //both the quantity and the servings properties are updated
}

export const addBookmark = function (recipe) {
  //Add bookmark
  state.bookmarks.push(recipe); //add the whole recipe in the bookmarks array. Mark current recipe as bookmark   
  recipe.bookmarked = true  //recipe will be state.recipe, because that's how this function is invoked addBookmark(model.state.recipe)
  bookmarksLocalStorage();  
}

export const deleteBookmark = function (id) {
  //Delete bookmark
  const index = state.bookmarks.findIndex(elm => elm.id === id); //find the recipe from bookmarks[] that has the same ID as the current recipe
  state.bookmarks.splice(index,1); //delete it
  //Mark current recipe as NOT a bookmark 
  state.recipe.bookmarked = false;  //set the bookmarked property to FALSE  
  bookmarksLocalStorage();
}

const bookmarksLocalStorage = function (){ 
  //and then in Firefox go to STORAGE - LOCAL STORAGE
  //this way, every time we add or delete a bookmark, we will save the state.bookmarks value in our local storage  
  localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));  
}

const initBookmark = function(){
  const storage = localStorage.getItem('bookmarks');
  if(storage) state.bookmarks = JSON.parse(storage);
}

initBookmark();

export const uploadRecipe = async function (newRecipe) {
  try {
    console.log(newRecipe); //Object   ingredient: "quantity, unit, description"
    //convert Object back to Array, because we will use .map and .filter
    console.log(Object.entries(newRecipe));

    //Object.entries(newRecipe) gives you [ingredient, "quantity, unit, description"]
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '') //first element is ingredient, and second is NOT empty
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(','); //[quantity, unit, description]
        if (ingArr.length !== 3) { //if length is not 3
            throw new Error(
            'Wrong ingredient format 🔥 Please use the correct format 🔥'
          );
        }
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? Number(quantity) : null, unit, description };
      });
    
      console.log(ingredients);

    //same format as when we recive a recipe from that API
      
    const recipeObject = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: Number(newRecipe.cookingTime),
      servings: Number(newRecipe.servings),
      ingredients,
    };

    console.log(recipeObject);

  const data = await AJAX(`${API_URL}?key=${KEY}`, recipeObject);
  state.recipe = createRecipeObject(data);  
  addBookmark(state.recipe);
  
  } catch (err) {
    throw err;
  }
}



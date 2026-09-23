import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft, ArrowRight, Check, ChevronDown, Clock3, CreditCard, Eye,
  Heart, Home, LogIn, LogOut, MapPin, Menu, Minus, Package, Plus,
  Search, ShoppingBag, Star, Store, Trash2, Truck, User, Wallet, X
} from "lucide-react";
import "./styles.css";

const ASSET = "/assets/";

// Real food photography (Unsplash). The fixed photo IDs keep the images consistent.
const PHOTO = {
  pizza: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1000&q=85&auto=format&fit=crop",
  biryani: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=1000&q=85&auto=format&fit=crop",
  salad: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&q=85&auto=format&fit=crop",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000&q=85&auto=format&fit=crop",
  chinese: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1000&q=85&auto=format&fit=crop",
  southIndian: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1000&q=85&auto=format&fit=crop",
  cafe: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1000&q=85&auto=format&fit=crop",
  dessert: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1000&q=85&auto=format&fit=crop",
  noodles: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=1000&q=85&auto=format&fit=crop",
  thali: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1000&q=85&auto=format&fit=crop",
  pasta: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1000&q=85&auto=format&fit=crop",
  fries: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=1000&q=85&auto=format&fit=crop",
  naan: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=1000&q=85&auto=format&fit=crop",
  paneer: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=1000&q=85&auto=format&fit=crop",
  smoothie: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=1000&q=85&auto=format&fit=crop"
};

const restaurants = [
  { id:"pizza-palace", name:"Pizza Palace", image:PHOTO.pizza, cuisine:"Italian • Pizza", rating:4.8, deliveryTime:"25–35 min", deliveryFee:50, open:true, description:"Wood-fired pizzas, creamy pastas and fresh Italian flavours." },
  { id:"spice-garden", name:"Spice Garden", image:PHOTO.biryani, cuisine:"Indian • Biryani", rating:4.7, deliveryTime:"30–40 min", deliveryFee:40, open:true, description:"Rich biryanis, tandoori favourites and aromatic Indian curries." },
  { id:"green-bowl", name:"Green Bowl", image:PHOTO.salad, cuisine:"Healthy • Bowls", rating:4.6, deliveryTime:"20–30 min", deliveryFee:35, open:true, description:"Fresh salads, grain bowls, smoothies and wholesome sides." },
  { id:"burger-hub", name:"Burger Hub", image:PHOTO.burger, cuisine:"American • Burgers", rating:4.5, deliveryTime:"25–35 min", deliveryFee:45, open:true, description:"Juicy burgers, loaded fries and crispy sides made to order." },
  { id:"dragon-wok", name:"Dragon Wok", image:PHOTO.chinese, cuisine:"Chinese • Asian", rating:4.7, deliveryTime:"25–35 min", deliveryFee:45, open:true, description:"Wok-tossed noodles, dumplings and classic Indo-Chinese plates." },
  { id:"dakshin-flavours", name:"Dakshin Flavours", image:PHOTO.southIndian, cuisine:"South Indian • Breakfast", rating:4.8, deliveryTime:"20–30 min", deliveryFee:30, open:true, description:"Crispy dosas, fluffy idlis, vadas and comforting filter coffee." },
  { id:"urban-cafe", name:"Urban Cafe", image:PHOTO.cafe, cuisine:"Cafe • Continental", rating:4.5, deliveryTime:"20–30 min", deliveryFee:35, open:true, description:"All-day breakfast, sandwiches, coffee and relaxed cafe plates." },
  { id:"sweet-story", name:"Sweet Story", image:PHOTO.dessert, cuisine:"Desserts • Bakery", rating:4.9, deliveryTime:"15–25 min", deliveryFee:25, open:true, description:"Cakes, waffles, pastries and indulgent desserts for every mood." },
  { id:"noodle-house", name:"Noodle House", image:PHOTO.noodles, cuisine:"Asian • Noodles", rating:4.6, deliveryTime:"25–35 min", deliveryFee:40, open:true, description:"Hand-tossed noodles, ramen bowls and spicy Asian comfort food." },
  { id:"royal-thali", name:"Royal Thali", image:PHOTO.thali, cuisine:"Indian • Thali", rating:4.7, deliveryTime:"30–40 min", deliveryFee:40, open:true, description:"Traditional thalis with curries, breads, rice and seasonal sides." }
];

const menus = {
  "pizza-palace": [
    {id:"margherita",name:"Margherita Pizza",description:"Fresh tomato, mozzarella & basil",price:250,category:"Pizza",image:PHOTO.pizza},
    {id:"farmhouse",name:"Farmhouse Pizza",description:"Fresh vegetables & mozzarella",price:350,category:"Pizza",image:PHOTO.pizza},
    {id:"garlic-bread",name:"Garlic Bread",description:"Toasted bread with garlic butter",price:150,category:"Sides",image:PHOTO.pasta},
    {id:"pasta",name:"Creamy Alfredo Pasta",description:"Creamy sauce, herbs & parmesan",price:320,category:"Pasta",image:PHOTO.pasta}
  ],
  "spice-garden": [
    {id:"chicken-biryani",name:"Chicken Biryani",description:"Fragrant basmati rice & tender chicken",price:320,category:"Biryani",image:PHOTO.biryani},
    {id:"paneer-tikka",name:"Paneer Tikka",description:"Char-grilled paneer with spices",price:280,category:"Starters",image:PHOTO.paneer},
    {id:"naan",name:"Butter Naan",description:"Soft tandoori naan brushed with butter",price:70,category:"Breads",image:PHOTO.naan}
  ],
  "green-bowl": [
    {id:"protein-bowl",name:"Protein Power Bowl",description:"Quinoa, chickpeas, greens & avocado",price:290,category:"Bowls",image:PHOTO.salad},
    {id:"caesar",name:"Garden Caesar",description:"Crisp greens, parmesan & dressing",price:240,category:"Salads",image:PHOTO.salad},
    {id:"smoothie",name:"Berry Smoothie",description:"Mixed berries, banana & yogurt",price:180,category:"Drinks",image:PHOTO.smoothie}
  ],
  "burger-hub": [
    {id:"classic-burger",name:"Classic Burger",description:"Beef patty, lettuce, tomato & cheese",price:280,category:"Burgers",image:PHOTO.burger},
    {id:"crispy-fries",name:"Crispy Fries",description:"Golden seasoned potato fries",price:140,category:"Sides",image:PHOTO.fries}
  ],
  "dragon-wok": [
    {id:"hakka-noodles",name:"Hakka Noodles",description:"Wok-tossed noodles with vegetables",price:240,category:"Noodles",image:PHOTO.noodles},
    {id:"veg-dumplings",name:"Steamed Dumplings",description:"Soft dumplings with chilli-soy dip",price:220,category:"Starters",image:PHOTO.chinese},
    {id:"fried-rice",name:"Schezwan Fried Rice",description:"Fragrant rice with vegetables and chilli",price:250,category:"Rice",image:PHOTO.chinese}
  ],
  "dakshin-flavours": [
    {id:"masala-dosa",name:"Masala Dosa",description:"Crispy dosa with potato masala and chutneys",price:120,category:"Dosa",image:PHOTO.southIndian},
    {id:"idli-vada",name:"Idli Vada Combo",description:"Steamed idlis, medu vada, sambar and chutney",price:110,category:"Breakfast",image:PHOTO.southIndian},
    {id:"filter-coffee",name:"Filter Coffee",description:"South Indian coffee brewed fresh",price:60,category:"Drinks",image:PHOTO.cafe}
  ],
  "urban-cafe": [
    {id:"club-sandwich",name:"Club Sandwich",description:"Toasted bread, vegetables, cheese and sauce",price:230,category:"Sandwiches",image:PHOTO.cafe},
    {id:"cafe-pasta",name:"Creamy Cafe Pasta",description:"Cream sauce, herbs and parmesan",price:290,category:"Pasta",image:PHOTO.pasta},
    {id:"iced-coffee",name:"Iced Coffee",description:"Cold brewed coffee with milk and ice",price:150,category:"Drinks",image:PHOTO.cafe}
  ],
  "sweet-story": [
    {id:"waffle",name:"Belgian Chocolate Waffle",description:"Crispy waffle with chocolate and berries",price:220,category:"Waffles",image:PHOTO.dessert},
    {id:"donut",name:"Glazed Donuts",description:"Soft baked donuts with a sweet glaze",price:160,category:"Bakery",image:PHOTO.dessert},
    {id:"cake",name:"Chocolate Cake Slice",description:"Moist chocolate sponge with rich frosting",price:190,category:"Cakes",image:PHOTO.dessert}
  ],
  "noodle-house": [
    {id:"ramen",name:"Spicy Ramen Bowl",description:"Rich broth, noodles, greens and toppings",price:320,category:"Ramen",image:PHOTO.noodles},
    {id:"chilli-noodles",name:"Chilli Garlic Noodles",description:"Spicy garlic noodles with vegetables",price:250,category:"Noodles",image:PHOTO.noodles},
    {id:"spring-rolls",name:"Crispy Spring Rolls",description:"Golden rolls served with sweet chilli sauce",price:180,category:"Starters",image:PHOTO.chinese}
  ],
  "royal-thali": [
    {id:"veg-thali",name:"Royal Veg Thali",description:"Curries, dal, rice, roti, salad and dessert",price:320,category:"Thali",image:PHOTO.thali},
    {id:"north-indian-thali",name:"North Indian Thali",description:"Paneer, dal, rice, naan, raita and dessert",price:340,category:"Thali",image:PHOTO.thali},
    {id:"lassi",name:"Sweet Lassi",description:"Chilled creamy yogurt drink",price:90,category:"Drinks",image:PHOTO.cafe}
  ]
};

const statusSteps = ["PLACED", "ACCEPTED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"];

const AppContext = createContext(null);
const useApp = () => useContext(AppContext);

function AppProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("fd_user") || "null"));
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("fd_cart") || "[]"));
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem("fd_orders") || "[]"));

  useEffect(() => localStorage.setItem("fd_user", JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem("fd_cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("fd_orders", JSON.stringify(orders)), [orders]);

  const addToCart = (restaurantId, item) => {
    setCart(prev => {
      if (prev.length && prev[0].restaurantId !== restaurantId) {
        return [{ restaurantId, itemId: item.id, item, quantity: 1 }];
      }
      const found = prev.find(x => x.itemId === item.id);
      if (found) return prev.map(x => x.itemId === item.id ? { ...x, quantity: x.quantity + 1 } : x);
      return [...prev, { restaurantId, itemId: item.id, item, quantity: 1 }];
    });
  };

  const changeQty = (itemId, delta) => {
    setCart(prev => prev.map(x => x.itemId === itemId ? { ...x, quantity: x.quantity + delta } : x).filter(x => x.quantity > 0));
  };

  const removeItem = itemId => setCart(prev => prev.filter(x => x.itemId !== itemId));

  const clearCart = () => setCart([]);

  const createOrder = ({ address, payment }) => {
    const restaurant = restaurants.find(r => r.id === cart[0]?.restaurantId);
    const subtotal = cart.reduce((s, x) => s + x.item.price * x.quantity, 0);
    const delivery = restaurant?.deliveryFee ?? 0;
    const tax = Math.round(subtotal * 0.05);
    const order = {
      id: String(10025 + orders.length),
      restaurantId: restaurant?.id,
      restaurant: restaurant?.name,
      items: cart.map(x => ({ ...x })),
      subtotal, delivery, tax, total: subtotal + delivery + tax,
      address, payment, status: "PLACED",
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [order, ...prev]);
    clearCart();
    return order.id;
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const value = useMemo(() => ({
    user, setUser, cart, orders, addToCart, changeQty, removeItem, clearCart,
    createOrder, updateOrderStatus
  }), [user, cart, orders]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function Shell({ children }) {
  const { user, cart, setUser } = useApp();
  const [open, setOpen] = useState(false);
  const path = window.location.pathname;

  const nav = to => { window.history.pushState({}, "", to); window.dispatchEvent(new PopStateEvent("popstate")); setOpen(false); };
  const logout = () => { setUser(null); nav("/login"); };

  return (
    <div className="app">
      <header className="topbar">
        <button className="brand" onClick={() => nav("/")}>
          <span className="brand-mark">FD</span><span>FoodDash</span>
        </button>
        <nav className="desktop-nav">
          <button onClick={() => nav("/")}>Restaurants</button>
          <button onClick={() => nav("/tracking")}>Track Order</button>
          <button onClick={() => nav("/restaurant-dashboard")}>Restaurant Dashboard</button>
        </nav>
        <div className="top-actions">
          <button className="icon-btn cart-btn" onClick={() => nav("/cart")} aria-label="Cart">
            <ShoppingBag size={20}/>{cart.length > 0 && <span>{cart.reduce((a,x)=>a+x.quantity,0)}</span>}
          </button>
          {user ? (
            <div className="user-menu">
              <button className="avatar" onClick={() => setOpen(v=>!v)}>{user.name?.[0]?.toUpperCase() || "U"}</button>
              {open && <div className="dropdown">
                <div className="dropdown-user"><b>{user.name}</b><small>{user.email}</small></div>
                <button onClick={() => nav("/")}><Home size={16}/> Home</button>
                <button onClick={() => nav("/tracking")}><Package size={16}/> My Orders</button>
                <button onClick={logout}><LogOut size={16}/> Logout</button>
              </div>}
            </div>
          ) : <button className="login-link" onClick={() => nav("/login")}><LogIn size={17}/> Login</button>}
          <button className="mobile-menu" onClick={() => setOpen(v=>!v)}><Menu size={22}/></button>
        </div>
      </header>
      {open && <div className="mobile-nav">
        <button onClick={() => nav("/")}>Restaurants</button>
        <button onClick={() => nav("/tracking")}>Track Order</button>
        <button onClick={() => nav("/restaurant-dashboard")}>Restaurant Dashboard</button>
      </div>}
      <main>{children}</main>
      <footer><span>© 2026 FoodDash</span><span>Fresh food. Fast delivery.</span></footer>
    </div>
  );
}

function Landing() {
  const [query, setQuery] = useState("");
  const filtered = restaurants.filter(r => `${r.name} ${r.cuisine}`.toLowerCase().includes(query.toLowerCase()));
  const nav = to => { window.history.pushState({}, "", to); window.dispatchEvent(new PopStateEvent("popstate")); };

  return <div>
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">DELIVERY AT YOUR DOOR</div>
        <h1>Good food,<br/><span>great mood.</span></h1>
        <p>Order from your favourite local restaurants and get fresh meals delivered to your door.</p>
        <div className="searchbar"><Search size={20}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search restaurants or cuisine"/></div>
      </div>
      <div className="hero-art">
        <img src={PHOTO.pizza} alt="Fresh restaurant meal"/>
      </div>
    </section>

    <section className="content-section">
      <div className="section-head"><div><div className="eyebrow">DISCOVER</div><h2>Restaurants near you</h2></div><span>{filtered.length} places</span></div>
      <div className="restaurant-grid">
        {filtered.map(r => <RestaurantCard key={r.id} restaurant={r} onOpen={() => nav(`/restaurant/${r.id}`)}/>)}
      </div>
      {!filtered.length && <Empty title="No restaurants found" text="Try another restaurant name or cuisine."/>}
    </section>
  </div>;
}

function RestaurantCard({ restaurant, onOpen }) {
  return <article className="restaurant-card">
    <div className="restaurant-image"><img src={restaurant.image} alt={restaurant.name}/><span className={restaurant.open ? "status open" : "status closed"}>{restaurant.open ? "OPEN" : "CLOSED"}</span><button className="heart"><Heart size={18}/></button></div>
    <div className="restaurant-info">
      <div className="card-title-row"><h3>{restaurant.name}</h3><span className="rating"><Star size={15} fill="currentColor"/> {restaurant.rating}</span></div>
      <p>{restaurant.cuisine}</p>
      <div className="meta"><span><Clock3 size={15}/> {restaurant.deliveryTime}</span><span>₹{restaurant.deliveryFee} delivery</span></div>
      <button className="primary wide" onClick={onOpen} disabled={!restaurant.open}>{restaurant.open ? "View menu" : "Currently closed"} <ArrowRight size={17}/></button>
    </div>
  </article>;
}

function RestaurantPage({ id }) {
  const restaurant = restaurants.find(r => r.id === id);
  const menu = menus[id] || [];
  const { cart, addToCart } = useApp();
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(menu.map(i => i.category))];
  const filtered = category === "All" ? menu : menu.filter(i => i.category === category);
  const nav = to => { window.history.pushState({}, "", to); window.dispatchEvent(new PopStateEvent("popstate")); };

  if (!restaurant) return <NotFound/>;

  return <div className="content-section">
    <button className="back-link" onClick={() => nav("/")}><ArrowLeft size={17}/> Back to restaurants</button>
    <div className="restaurant-hero">
      <img src={restaurant.image} alt={restaurant.name}/>
      <div><span className="pill green">{restaurant.open ? "Open now" : "Closed"}</span><h1>{restaurant.name}</h1><p>{restaurant.description}</p><div className="restaurant-details"><span><Star size={16} fill="currentColor"/> {restaurant.rating}</span><span><Clock3 size={16}/> {restaurant.deliveryTime}</span><span>₹{restaurant.deliveryFee} delivery</span></div></div>
    </div>
    <div className="category-tabs">{categories.map(c=><button className={category===c?"active":""} key={c} onClick={()=>setCategory(c)}>{c}</button>)}</div>
    <div className="menu-layout">
      <div className="menu-list">
        {filtered.map(item => <MenuItem key={item.id} restaurantId={id} item={item} cart={cart} addToCart={addToCart}/>)}
      </div>
      <div className="mini-cart"><h3>Your cart</h3>{cart.length ? <><div className="mini-cart-items">{cart.map(x=><div key={x.itemId}><span>{x.item.name} × {x.quantity}</span><b>₹{x.item.price*x.quantity}</b></div>)}</div><button className="primary wide" onClick={()=>nav("/cart")}>View cart <ArrowRight size={17}/></button></> : <p className="muted">Add a delicious item to get started.</p>}</div>
    </div>
  </div>;
}

function MenuItem({ restaurantId, item, cart, addToCart }) {
  const qty = cart.find(x=>x.itemId===item.id)?.quantity || 0;
  return <article className="menu-item">
    <img src={item.image} alt={item.name}/>
    <div className="menu-copy"><div className="item-head"><h3>{item.name}</h3><b>₹{item.price}</b></div><p>{item.description}</p><span className="category-label">{item.category}</span></div>
    <div>{qty ? <div className="qty"><button onClick={()=>useApp().changeQty(item.id,-1)}><Minus size={15}/></button><b>{qty}</b><button onClick={()=>useApp().changeQty(item.id,1)}><Plus size={15}/></button></div> : <button className="add-btn" onClick={()=>addToCart(restaurantId,item)}>Add <Plus size={15}/></button>}</div>
  </article>;
}

function CartPage() {
  const { cart, changeQty, removeItem } = useApp();
  const restaurant = restaurants.find(r => r.id === cart[0]?.restaurantId);
  const subtotal = cart.reduce((s,x)=>s+x.item.price*x.quantity,0);
  const delivery = restaurant?.deliveryFee || 0;
  const tax = Math.round(subtotal*.05);
  const total = subtotal + delivery + tax;
  const nav = to => { window.history.pushState({}, "", to); window.dispatchEvent(new PopStateEvent("popstate")); };
  if (!cart.length) return <Empty title="Your cart is empty" text="Browse restaurants and add something tasty." action="Browse restaurants" onAction={()=>nav("/")}/>;
  return <div className="content-section narrow">
    <button className="back-link" onClick={()=>nav(`/restaurant/${restaurant.id}`)}><ArrowLeft size={17}/> Continue shopping</button>
    <h1>Shopping cart</h1><p className="lead">Your order from <b>{restaurant.name}</b></p>
    <div className="cart-layout">
      <div className="panel">
        {cart.map(x=><div className="cart-row" key={x.itemId}><img src={x.item.image} alt=""/><div className="cart-item-copy"><h3>{x.item.name}</h3><p>₹{x.item.price} each</p></div><div className="qty"><button onClick={()=>changeQty(x.itemId,-1)}><Minus size={15}/></button><b>{x.quantity}</b><button onClick={()=>changeQty(x.itemId,1)}><Plus size={15}/></button></div><b className="line-total">₹{x.item.price*x.quantity}</b><button className="delete-btn" onClick={()=>removeItem(x.itemId)}><Trash2 size={17}/></button></div>)}
      </div>
      <Summary subtotal={subtotal} delivery={delivery} tax={tax} total={total} button="Checkout" onClick={()=>nav("/checkout")}/>
    </div>
  </div>;
}

function Summary({ subtotal, delivery, tax, total, button, onClick }) {
  return <aside className="summary panel"><h3>Order summary</h3><div><span>Subtotal</span><b>₹{subtotal}</b></div><div><span>Delivery</span><b>₹{delivery}</b></div><div><span>Tax</span><b>₹{tax}</b></div><hr/><div className="grand"><span>Total</span><b>₹{total}</b></div>{button && <button className="primary wide" onClick={onClick}>{button} <ArrowRight size={17}/></button>}</aside>;
}

function Checkout() {
  const { cart, createOrder } = useApp();
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("UPI");
  const [error, setError] = useState("");
  const restaurant = restaurants.find(r => r.id === cart[0]?.restaurantId);
  const subtotal = cart.reduce((s,x)=>s+x.item.price*x.quantity,0), delivery = restaurant?.deliveryFee || 0, tax = Math.round(subtotal*.05), total = subtotal+delivery+tax;
  const nav = to => { window.history.pushState({}, "", to); window.dispatchEvent(new PopStateEvent("popstate")); };
  if (!cart.length) return <Empty title="Nothing to checkout" text="Your cart is empty." action="Go to restaurants" onAction={()=>nav("/")}/>;
  const submit = e => { e.preventDefault(); if(address.trim().length < 10) return setError("Please enter a complete delivery address."); const id = createOrder({address, payment}); nav(`/tracking/${id}`); };
  return <div className="content-section narrow">
    <button className="back-link" onClick={()=>nav("/cart")}><ArrowLeft size={17}/> Back to cart</button>
    <h1>Checkout & payment</h1><p className="lead">Almost there — confirm your delivery details.</p>
    <form className="checkout-grid" onSubmit={submit}>
      <div className="panel form-panel">
        <label>Delivery address</label>
        <textarea value={address} onChange={e=>{setAddress(e.target.value);setError("")}} placeholder="House / Flat, street, area, city, PIN code" rows="5"/>
        <label>Payment method</label>
        <div className="payment-options">{[
          ["UPI", CreditCard, "Pay securely using UPI"],
          ["Card", CreditCard, "Visa, Mastercard and more"],
          ["Wallet", Wallet, "Use your digital wallet"]
        ].map(([name,Icon,desc])=><button type="button" key={name} className={payment===name?"payment selected":"payment"} onClick={()=>setPayment(name)}><span className="radio">{payment===name && <span/>}</span><Icon size={20}/><span><b>{name}</b><small>{desc}</small></span></button>)}</div>
        {error && <div className="error">{error}</div>}
      </div>
      <Summary subtotal={subtotal} delivery={delivery} tax={tax} total={total} button="Pay now" onClick={()=>{}}/>
      <button className="primary checkout-submit" type="submit">Pay ₹{total} now <ArrowRight size={18}/></button>
    </form>
  </div>;
}

function Tracking({ orderId }) {
  const { orders, updateOrderStatus } = useApp();
  const order = orders.find(o=>o.id===orderId) || orders[0];
  const nav = to => { window.history.pushState({}, "", to); window.dispatchEvent(new PopStateEvent("popstate")); };
  if (!order) return <Empty title="No orders yet" text="Place an order and track it here." action="Order food" onAction={()=>nav("/")}/>;
  const current = statusSteps.indexOf(order.status);
  return <div className="content-section narrow">
    <button className="back-link" onClick={()=>nav("/")}><ArrowLeft size={17}/> Restaurants</button>
    <div className="tracking-head"><div><div className="eyebrow">ORDER TRACKING</div><h1>Order #{order.id}</h1><p>{order.restaurant}</p></div><span className="status-large">{order.status.replaceAll("_"," ")}</span></div>
    <div className="panel tracking-panel">
      <div className="progress-line">{statusSteps.map((s,i)=><div className={`step ${i<=current?"done":""} ${i===current?"current":""}`} key={s}><span>{i<current?<Check size={16}/>:i===current?<span className="dot"/>:<span/>}</span><b>{s.replaceAll("_"," ")}</b></div>)}</div>
      <div className="tracking-info"><div><MapPin size={19}/><span><small>Delivering to</small><b>{order.address}</b></span></div><div><CreditCard size={19}/><span><small>Payment</small><b>{order.payment}</b></span></div><div><ShoppingBag size={19}/><span><small>Total</small><b>₹{order.total}</b></span></div></div>
      {order.status !== "DELIVERED" && <div className="demo-note">Demo controls: the restaurant dashboard can move this order through the delivery statuses.</div>}
    </div>
    <div className="panel order-items"><h3>Items</h3>{order.items.map(x=><div key={x.itemId}><span>{x.item.name} × {x.quantity}</span><b>₹{x.item.price*x.quantity}</b></div>)}</div>
    <button className="secondary wide" onClick={()=>nav("/restaurant-dashboard")}>Open restaurant dashboard <Store size={17}/></button>
  </div>;
}

function RestaurantDashboard() {
  const { orders, updateOrderStatus } = useApp();
  const pending = orders.filter(o=>!["DELIVERED","CANCELLED","REJECTED"].includes(o.status));
  const completed = orders.filter(o=>["DELIVERED"].includes(o.status));
  const rejected = orders.filter(o=>["REJECTED","CANCELLED"].includes(o.status));
  const setStatus = (id, status) => updateOrderStatus(id,status);
  return <div className="content-section">
    <div className="dashboard-head"><div><div className="eyebrow">RESTAURANT OPERATOR</div><h1>Restaurant Dashboard</h1><p>Manage today's orders and keep customers updated.</p></div><span className="live-dot">● LIVE</span></div>
    <div className="stats-grid"><Stat label="Today's Orders" value={42 + orders.length}/><Stat label="Pending Orders" value={5 + pending.length}/><Stat label="Completed" value={34 + completed.length}/><Stat label="Rejected" value={3 + rejected.length}/></div>
    <div className="dashboard-grid">
      <section className="panel"><div className="panel-head"><h2>Pending orders</h2><span>{pending.length} active</span></div>
        {pending.length ? pending.map(o=><OrderAdmin key={o.id} order={o} onStatus={setStatus}/>) : <Empty title="No pending orders" text="New customer orders will appear here."/>}
      </section>
      <section className="panel menu-admin"><div className="panel-head"><h2>Menu management</h2><span>Pizza Palace</span></div>
        {menus["pizza-palace"].slice(0,3).map(i=><div className="admin-menu-row" key={i.id}><img src={i.image} alt=""/><span><b>{i.name}</b><small>{i.category}</small></span><strong>₹{i.price}</strong><button className="secondary small">Edit</button></div>)}
        <button className="primary wide">Add menu item <Plus size={17}/></button>
      </section>
    </div>
  </div>;
}

function Stat({label,value}) { return <div className="stat panel"><span>{label}</span><strong>{value}</strong><small>Today</small></div>; }

function OrderAdmin({ order, onStatus }) {
  const next = { PLACED:"ACCEPTED", ACCEPTED:"PREPARING", PREPARING:"OUT_FOR_DELIVERY", OUT_FOR_DELIVERY:"DELIVERED" }[order.status];
  return <div className="admin-order">
    <div className="admin-order-top"><div><b>Order #{order.id}</b><small>{new Date(order.createdAt).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</small></div><span className="pill">{order.status.replaceAll("_"," ")}</span></div>
    <div className="admin-items">{order.items.map(x=><div key={x.itemId}>{x.quantity} × {x.item.name}<span>₹{x.item.price*x.quantity}</span></div>)}</div>
    <div className="admin-order-bottom"><b>Total ₹{order.total}</b><div>{order.status==="PLACED" && <button className="danger-outline" onClick={()=>onStatus(order.id,"REJECTED")}>Reject</button>}{next && <button className="primary small" onClick={()=>onStatus(order.id,next)}>{order.status==="PLACED"?"Accept":`Mark ${next.replaceAll("_"," ").toLowerCase()}`}</button>}</div></div>
  </div>;
}

function Auth({ mode="login" }) {
  const { setUser } = useApp();
  const [isRegister, setIsRegister] = useState(mode==="register");
  const [name,setName] = useState(""); const [email,setEmail] = useState(""); const [password,setPassword] = useState(""); const [error,setError] = useState("");
  const nav = to => { window.history.pushState({}, "", to); window.dispatchEvent(new PopStateEvent("popstate")); };
  const submit = e => { e.preventDefault(); if(!email || !password || (isRegister&&!name)) return setError("Please fill in all required fields."); setUser({name:name||email.split("@")[0],email}); nav("/"); };
  return <div className="auth-page"><div className="auth-art"><img src={PHOTO.pizza} alt="Fresh restaurant meal"/><h2>Delicious food,<br/>one click away.</h2><p>Discover local favourites and order in a few simple steps.</p></div><div className="auth-card"><button className="brand auth-brand" onClick={()=>nav("/")}><span className="brand-mark">FD</span><span>FoodDash</span></button><h1>{isRegister?"Create your account":"Welcome back"}</h1><p>{isRegister?"Register to start ordering":"Log in to continue your food journey."}</p><form onSubmit={submit}>{isRegister&&<label>Full name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/></label>}<label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/></label>{error&&<div className="error">{error}</div>}<button className="primary wide" type="submit">{isRegister?"Create account":"Login"} <ArrowRight size={17}/></button></form>{!isRegister&&<button className="text-btn" onClick={()=>setError("Password reset is not connected in this frontend demo.")}>Forgot password?</button>}<div className="auth-switch">{isRegister?"Already have an account?":"Don't have an account?"}<button onClick={()=>{setIsRegister(!isRegister);setError("")}}>{isRegister?"Login":"Register"}</button></div></div></div>;
}

function Empty({title,text,action,onAction}) { return <div className="empty panel"><ShoppingBag size={38}/><h2>{title}</h2><p>{text}</p>{action&&<button className="primary" onClick={onAction}>{action}<ArrowRight size={17}/></button>}</div>; }
function NotFound(){ return <Empty title="Page not found" text="The page you requested does not exist." action="Go home" onAction={()=>{window.location.href="/"}}/>; }

function Router() {
  const [, force] = useState(0);
  useEffect(() => { const f=()=>force(x=>x+1); window.addEventListener("popstate",f); return ()=>window.removeEventListener("popstate",f); },[]);
  const path = window.location.pathname;
  if(path==="/login") return <Auth mode="login"/>;
  if(path==="/register") return <Auth mode="register"/>;
  let page;
  if(path==="/") page=<Landing/>;
  else if(path==="/cart") page=<CartPage/>;
  else if(path==="/checkout") page=<Checkout/>;
  else if(path==="/tracking") page=<Tracking/>;
  else if(path.startsWith("/tracking/")) page=<Tracking orderId={path.split("/")[2]}/>;
  else if(path==="/restaurant-dashboard") page=<RestaurantDashboard/>;
  else if(path.startsWith("/restaurant/")) page=<RestaurantPage id={path.split("/")[2]}/>;
  else page=<NotFound/>;
  return <Shell>{page}</Shell>;
}

createRoot(document.getElementById("root")).render(<AppProvider><Router/></AppProvider>);

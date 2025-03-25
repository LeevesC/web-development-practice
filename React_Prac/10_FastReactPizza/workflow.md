---
title: Logic Flow
markmap:
  colorFreezeLevel: 2
---

# Element perspective

## Home (:/)

- Header
  - Logo
  - Search_bar
  - Name (null before login)
- Login

## Menu (:/menu)

- Header...
- Menu_item_list
  - Menu_item
- Cart_over_view

## Cart (:/cart)

- Header...
- Cart_item_list
  - Cart_item
- Cart_over_view

## Order (:/)

## NewOrder

# Feature perspective

## Home (:/)

- Header
  - Logo
    - ==Jump to homepage==
  - Search_bar
    - ==GET data from api== (after submit)
- Login
  - ==Update Global UI State (`username`)==

## Menu (:/menu)

- Menu_item_list
  - ==GET menu data from api== (page initial)
- Menu_item
  - ==Add to cart==
  - ==Delete from cart==
  - ==increment or decrement quantities==

## Cart (:/cart)

- Cart
  - ==Order_pizzas (jump to /order/new)==
  - ==Clear_cart==
- Cart_item
  - ==Delete from cart==
  - ==increment or decrement quantities==

## Order (:/order/id)

- Order
  - display order information

## NewOrder (:/order/new)

- Create_order
  - ==get location info==
  - ==generate order data from Form==
  - ==POST to api==

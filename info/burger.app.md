## Plan a React app
1. Component tree/structure. Figure out tree of components your app will consist of.
2. Application State (Data). Make a blueprint of you state.
3. Components vs Container. Decide what components will be representative, and what more logic ones. 


Authentication and authorization in identitytoolkit stored in firebase > authentication section. It's not in the DB or
something it's provided out if the firebase box.

In Firebase, in realtime databases, there is a tab rules. To turn on the authentication you need to type there the:
```json
{
  "rules": {
//    ".read": "true", - for everyone
//    ".read": "auth != null", // if user auth == null, means not authenticated - no acces. But this is for whole DB
      "my_specific_document": { // here I'm adding specific rule for some doc. Be carefull general rules can rewrite those (maybe)
        ".read": "auth != null",
        ".write": "auth != null"
      }
  }
}
```
This `auth` is the query parameter that you can add to the request, so validation is very simple.
```ts
axiosRequest.get(`/orders.json?auth=${props?.user?.idToken}`);
```

To make your data filter by something you need to add rule to DB 
```json
    "orders": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["userID"]
    },
```
Now you can filter by userID
```ts
axiosRequest.get(`/orders.json?auth=${token}&orderBy="userID"&equalTo="${user.id}"`) // Here we will get only needed orders
```

#### Hosting
Hosting is done via firebase
```shell
npm install -g firebase-tools;
firebase login;
firebase init;
firebase deploy;
```

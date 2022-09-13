# Reactjs-MobX-IndexedDB-CRUD
Data Management with Mobx, React router, crud apply in IndexedDb and login page two private page(Admin, User)
1. Implement small app with 2 screens: login(public), dashboard(private).
2. Login screen - form with two fields: email, password.
3. There will be 2 roles of users: admin, user. User will have only 2 visible fields: name, email.
4. "Admin" dashboard will show list of all users and form for creating new user.
5. "User" dashboard will show just friends list.
6. User with role "user" should be able to add/remove friends to his friends list.
7. For storing persisted data use IndexedDB.
 
 
Tech stack:
 
-react-router (v6) for routing
-react-hook-form for forms.
-react(functional) for UI.
-Mobx store(class) as state manager.
- Browser IndexedDB as DB for users/friends.

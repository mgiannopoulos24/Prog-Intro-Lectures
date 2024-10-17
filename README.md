# [Prog-Intro-Lectures](https://progintrolectures.netlify.app/)

## Περιγραφή
Η εφαρμογή **Prog-Intro-Lectures** είναι μια διαδικτυακή πλατφόρμα σχεδιασμένη για τη συγκέντρωση όλων των υλικών του μαθήματος "Εισαγωγή στον Προγραμματισμό" του Τμήματος Πληροφορικής και Τηλεπικοινωνιών (DIT).

Εδώ θα βρείτε:
- Καταγραφές μαθημάτων
- Διαφάνειες
- Kahoot Quizzes για εξάσκηση
- Coding Challenges για να δοκιμάσετε τις ικανότητές σας

## Εργαλεία σχεδιασμού
1. React
2. NodeJS
3. React Boostrap
4. Docker

## Γλώσσες που χρησιμοποιήθηκαν
1. HTML
2. CSS
3. JavaScript
4. Python

## Έμπνευση
Έμπνευση ήταν η σελίδα [Quiz App](https://starlit-daffodil-2e4733.netlify.app/). Credits στην [original creator](https://github.com/matinanadali).

## To-Do

- [X] Να βάλουμε τα quiz.
- [X] Να βάλουμε τα emojis.
- [X] Να φτιάξουμε το background dark-white.
- [X] Να βάλουμε Google Sans γραμματοσειρά.
- [X] Να οργανώσουμε τα αρχεία σε υποφακέλους.
- [X] Να προστεθούν ασκήσεις με κώδικα.

## Εγκατάσταση
### Τοπική εγκατάσταση για Frontend:
Για να εγκαταστήσετε και να τρέξετε το frontend τοπικά, ακολουθήστε τα παρακάτω βήματα:

1. Κλωνοποιήστε το αποθετήριο:
```console
https://github.com/mgiannopoulos24/Prog-Intro-Lectures.git
```
2. Μεταβείτε στο φάκελο του project:
```console
cd Prog-Intro-Lectures
```
3. Εγκαταστήστε τα απαιτούμενα πακέτα:
```console
npm install
```
4. Ξεκινήστε την εφαρμογή.
```console
npm start
```

Βεβαιωθείτε ότι έχετε εγκαταστήσει το [NodeJS](https://nodejs.org/en) στον υπολογιστή σας.

### Εκτέλεση του Backend μέσω Docker:
Για να τρέξετε το backend μέρος της εφαρμογής μέσω Docker, ακολουθήστε τα παρακάτω βήματα:

1. Βεβαιωθείτε ότι έχετε εγκαταστημένο το [Docker](https://www.docker.com/) στον υπολογιστή σας.
2. Βεβαιωθείτε ότι το Docker Desktop εκτελείται.
3. Δημιουργήστε την εικόνα Docker για το backend:
```console
docker build -t prog-intro-backend .
```
4. Εκτελέστε το backend container:
```console
docker run -p 5000:5000 prog-intro-backend
```
5. Το backend API θα είναι διαθέσιμο στη διεύθυνση `http://localhost:5000`.


Μπορείτε να εκτελέσετε το frontend και το backend ταυτόχρονα τοπικά, όπου το backend μέσω Docker θα εξυπηρετεί τα αιτήματα του frontend.
## Ευχαριστίες 

Θερμές ευχαριστίες αποδίδονται στον κύριο [Θανάση Αυγερινό](https://github.com/ethan42), ο οποίος μας παρείχε τα Kahoot Quiz.

## Ευχαριστίες προς τους Χρήστες
Ευχαριστούμε θερμά όλους εσάς που χρησιμοποιείτε την πλατφόρμα **Prog-Intro-Lectures**. Η συμβολή σας στην ανάπτυξη και εξέλιξη της εφαρμογής είναι ανεκτίμητη. Ελπίζουμε να απολαμβάνετε την εμπειρία μάθησης και να σας βοηθά στις σπουδές σας. Σας προσκαλούμε να συνεχίσετε να μοιράζεστε τις σκέψεις σας και να μας στέλνετε τις προτάσεις σας για βελτιώσεις.

Με εκτίμηση,
Η ομάδα του **Prog-Intro-Lectures**.
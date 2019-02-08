import firebase from 'firebase';

	const config = {
		apiKey: "AIzaSyAfqyvZIFTHcUMWXw5D8X3TwUmVaqNAkpk",
		authDomain: "artsyfartsy-2ba80.firebaseapp.com",
		databaseURL: "https://artsyfartsy-2ba80.firebaseio.com",
		projectId: "artsyfartsy-2ba80",
		storageBucket: "gs://artsyfartsy-2ba80.appspot.com",
		messagingSenderId: "249602778406"
	};

	firebase.initializeApp(config);

export default firebase

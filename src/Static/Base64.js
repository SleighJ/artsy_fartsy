// Convert a Base64-encoded string to a File object
export function base64StringtoFile (base64String, filename) {
	console.log('called')
	var arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n)
	}
	return new File([u8arr], filename, {type: mime})
}

// Download a Base64-encoded file

export function downloadBase64File (base64Data, filename) {
	var element = document.createElement('a')
	element.setAttribute('href', base64Data)
	element.setAttribute('download', filename)
	element.style.display = 'none'
	document.body.appendChild(element)
	element.click()
	document.body.removeChild(element)
}

export function arrayBufferToBase64(arrayBuffer) {
	var base64    = '';
	var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	var bytes         = new Uint8Array(arrayBuffer);
	var byteLength    = bytes.byteLength;
	var byteRemainder = byteLength % 3;
	var mainLength    = byteLength - byteRemainder;
	var a, b, c, d;
	var chunk;

	// Main loop deals with bytes in chunks of 3
	for (var i = 0; i < mainLength; i = i + 3) {
		// Combine the three bytes into a single integer
		chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

		// Use bitmasks to extract 6-bit segments from the triplet
		a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
		b = (chunk & 258048)   >> 12; // 258048   = (2^6 - 1) << 12
		c = (chunk & 4032)     >>  6; // 4032     = (2^6 - 1) << 6
		d = chunk & 63;               // 63       = 2^6 - 1

		// Convert the raw binary segments to the appropriate ASCII encoding
		base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
	}

	// Deal with the remaining bytes and padding
	if (byteRemainder == 1) {
		chunk = bytes[mainLength];

		a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

		// Set the 4 least significant bits to zero
		b = (chunk & 3)   << 4; // 3   = 2^2 - 1

		base64 += encodings[a] + encodings[b] + '=='
	} else if (byteRemainder == 2) {
		chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

		a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
		b = (chunk & 1008)  >>  4; // 1008  = (2^6 - 1) << 4

		// Set the 2 least significant bits to zero
		c = (chunk & 15)    <<  2; // 15    = 2^4 - 1

		base64 += encodings[a] + encodings[b] + encodings[c] + '='
	}

	return base64
}

// Extract an Base64 Image's File Extension
export function extractImageFileExtensionFromBase64 (base64Data) {

	return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'))
}

// Base64 Image to Canvas with a Crop
export function image64toCanvasRef (canvasRef, image64, pixelCrop) {

	const canvas = canvasRef;
	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;

	const ctx = canvas.getContext('2d');
	const image = new Image();
	image.src = image64;

	image.onload = function () {
		console.log('wtf mate, wtf is going on in here')
		ctx.drawImage(
			image,
			pixelCrop.x,
			pixelCrop.y,
			pixelCrop.width,
			pixelCrop.height,
			0,
			0,
			pixelCrop.width,
			pixelCrop.height
		)
	}
	console.log(image.onload)
}
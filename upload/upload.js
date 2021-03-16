//get form
const uploadForm = document.getElementById("upload-form");
//get submit button
const btn = document.getElementById("submitBtn");
//create an empty div for image inserting
const imageDiv = document.getElementById("imgDiv");

//on form submit
btn.addEventListener("click", (event) => {
  //prevent redirect
  event.preventDefault();

  //get file
  let uploadImage = uploadForm.file.files[0];
  console.log(uploadImage);

  //check for file type
  if (uploadImage.type.substr(0, 5) !== "image") {
    alert("Please select only images!");
    return;
  }

  img = document.createElement("img");
  img.style.width = "200px";

  //convert uploaded image to base 64 and append it to Div
  getBase64(uploadImage).then((data) => {
    console.log(data);
    img.src = data;
    imageDiv.appendChild(img);
  });
  alert("Image uploaded successfully!");
});

//convert image to base 64
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}


    let submitBtn = document.getElementById('submit_btn');
    let inputField = document.getElementById('input_field');
    let parentList = document.getElementById('parent_list');
    let feedback = document.getElementById('feedback');
    let editMode = false;
    let editElement = null;

    submitBtn.addEventListener('click', function (e) {
        let currentBtn = e.currentTarget;
        let currentInput = currentBtn.previousElementSibling;
        let currentRes = currentInput.value;

        if (!currentRes) {
            showFeedback("Please enter a item.", "error");
            return;
        }
        if (editMode) {
            editElement.querySelector("h3").textContent = currentRes;
            currentInput.value = ""; 
            editMode = false;
            editElement = null;
            submitBtn.textContent = "Submit"; 
            showFeedback("item updated.", "success");
        } else {
            let newLi = document.createElement('li');
            newLi.className = "list_items flex justify-between";
            newLi.innerHTML = `
                <h3 class="w-5">${currentRes}</h3>
                <button type="button" onclick="editData(this)">
                    <svg class="feather feather-edit" fill="green" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </button>
                <button type="button" onclick="removeData(this)">
                    <svg height="24" viewBox="0 0 48 48" width="30" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z"/>
                        <path d="M0 0h48v48H0z" fill="none"/>
                    </svg>
                </button>
            `;
            parentList.appendChild(newLi);
            currentInput.value = ""; 
            showFeedback("Item added to the list.", "success");
        }
    });

    function removeData(currentEle) {
        currentEle.parentElement.remove();
        showFeedback("Item deleted.", "warning");
    }

    function editData(currentEle) {
        let currentResName = currentEle.previousElementSibling.textContent;
        let inputField = submitBtn.previousElementSibling;

        inputField.value = currentResName;
        editMode = true;
        editElement = currentEle.parentElement;
        submitBtn.textContent = "Update"; 
    }
    
    function showFeedback(message, type){

        feedback.textContent= message;
        feedback.className= `text-center mx-16 mt-10`;
        switch (type) {
            case "success":
                feedback.classList.add("text-white", "bg-green-400");
                break;
            case "warning":
                feedback.classList.add("text-white", "bg-yellow-300");
                break;
            case "error":
                feedback.classList.add("text-red-700", "bg-red-100");
                break;
        }
        setTimeout(()=>{
            feedback.classList.add("hidden");
        }, 3000);
    }

function saveResults() {
    // Step 1: Clone the current HTML document
    const clone = document.documentElement.cloneNode(true);  // Clone the entire document

    // Step 2: Replace all input fields with non-editable <span> elements
    const inputs = clone.querySelectorAll('input');
    inputs.forEach(input => {
        const span = document.createElement('span');
        span.textContent = input.value;  // Copy the input's value
        input.parentNode.replaceChild(span, input);  // Replace input with the <span>
    });

    // Step 3: Replace textareas with non-editable <div> elements
    const textareas = clone.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const div = document.createElement('div');
        div.textContent = textarea.value;  // Copy the textarea's content
        textarea.parentNode.replaceChild(div, textarea);  // Replace textarea with the <div>
    });

    // Step 4: For select elements, show the selected option in a non-editable format,
    // but exclude select elements that have the class 'editable' (to keep them usable).
    const selects = clone.querySelectorAll('select');
    selects.forEach(select => {
        if (!select.classList.contains('editable')) {  // Skip editable select elements
            const selectedOption = select.options[select.selectedIndex];
            const span = document.createElement('span');
            span.textContent = selectedOption.text;  // Copy the selected option's text
            select.parentNode.replaceChild(span, select);  // Replace the select with the <span>
        }
    });

    // Step 5: Serialize the cloned document into a string
    const serializer = new XMLSerializer();
    const htmlString = serializer.serializeToString(clone);

    // Step 6: Create a Blob from the HTML string
    const blob = new Blob([htmlString], { type: 'text/html' });

    // Step 7: Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'results_view_only.html';  // Set the desired file name

    document.body.appendChild(link);  // Append the link to the document
    link.click();  // Simulate a click to trigger the download
    document.body.removeChild(link);  // Remove the link after download
}

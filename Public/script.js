        // Modal functionality
        const modal = document.getElementById("privacyPolicyModal");
        const link = document.getElementById("privacyPolicyLink");
        const span = document.getElementsByClassName("close")[0];

        link.onclick = function() {
            modal.style.display = "block";
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
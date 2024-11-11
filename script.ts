document.getElementById('resumeForm')?.addEventListener('submit', function(event: Event) {
    event.preventDefault();

    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLTextAreaElement;
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
    const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;
    const usernameElement = document.getElementById('username') as HTMLInputElement;

    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {

        const name: string = nameElement.value;
        const email: string = emailElement.value;
        const phone: string = phoneElement.value;
        const education: string = educationElement.value;
        const experience: string = experienceElement.value;
        const skills: string = skillsElement.value;
        const username: string = usernameElement.value;
        const uniquePath: string = `resumes/${username.replace(/\s+/g, '_')}_cv.html`;

        const profilePictureFile = profilePictureInput.files?.[0];
        let profilePictureURL = '';

        if (profilePictureFile) {
            const reader = new FileReader();
            reader.onloadend = function () {
                profilePictureURL = reader.result as string;

                const resumeOutput = `
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: 'Times New Roman', Times, serif;
                                margin: 20px;
                                padding: 0%;
                                background-color: antiquewhite;
                            }
                            h1 {
                                text-align: center;
                                color: brown;
                            }
                            .profilePicture {
                                width: 150px;
                                height: 150px;
                                border-radius: 50%;
                                object-fit: cover;
                                display: block;
                                margin: 0 auto;
                                border: 10px solid brown;
                                box-shadow: 0 0 8px 8px rgba(161, 19, 19, 0.5);
                            }
                            .contact-info {
                                font-size: 1.2rem;
                            }
                            .user-input {
                                font-weight: bold;
                            }
                            h3 {
                                color: #8B0000;
                            }
                            .education-output,
                            .experience-output,
                            .skills-output {
                                font-size: 1.1rem;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Resume</h1>
                        <br>
                        ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}
                        <br>
                        <p class="contact-info"><strong>Name:</strong> <span class="user-input">${name}</span></p>
                        <p class="contact-info"><strong>Email:</strong> <span class="user-input">${email}</span></p>
                        <p class="contact-info"><strong>Phone Number:</strong> <span class="user-input">${phone}</span></p>
                        <br>
                        <h3>Education</h3>
                        <p class="education-output">${education}</p>
                        <h3>Work Experience</h3>
                        <p class="experience-output">${experience}</p>
                        <h3>Skills</h3>
                        <p class="skills-output">${skills}</p>
                    </body>
                    </html>
                `;

                const downloadLink = document.createElement('a');
                downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
                downloadLink.download = uniquePath;
                downloadLink.textContent = 'Download Your 2024 Resume';

                const resumeOutputElement = document.getElementById('resumeOutput');
                if (resumeOutputElement) {
                    resumeOutputElement.innerHTML = resumeOutput;
                    resumeOutputElement.classList.remove("hidden");

                    const buttonsContainer = document.createElement("div");
                    buttonsContainer.id = "buttonsContainer";
                    resumeOutputElement.appendChild(buttonsContainer);

                    const downloadButton = document.createElement("button");
                    downloadButton.textContent = "Download as PDF";
                    downloadButton.addEventListener("click", () => {
                        window.print();
                    });
                    buttonsContainer.appendChild(downloadButton);

                    const shareLinkButton = document.createElement("button");
                    shareLinkButton.textContent = "Copy Shareable Link";
                    shareLinkButton.addEventListener("click", async () => {
                        try {
                            const shareableLink = `https://yourdomain.com/resumes/${name.replace(/\s+/g, "_")}_cv.html`;
                            await navigator.clipboard.writeText(shareableLink);
                            alert("Shareable link copied to clipboard!");
                        } catch (err) {
                            console.error("Failed to copy link: ", err);
                            alert("Failed to copy link to clipboard. Please try again.");
                        }
                    });
                    buttonsContainer.appendChild(shareLinkButton);

                    buttonsContainer.appendChild(document.createElement("br"));
                    buttonsContainer.appendChild(downloadLink);
                } else {
                    console.error("Resume output container not found");
                }
            };
            reader.readAsDataURL(profilePictureFile);
        } else {
            console.error('No profile picture selected');
        }
    } else {
        console.error('One or more form elements are missing');
    }
});

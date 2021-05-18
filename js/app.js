var CronSite = (function() {
    var render = function($, data) {
        renderTitleSection($, data);
        renderCoverPhoto($, data);
        renderIntroduction($, data);
        renderKnowledge($, data);
        renderEducation($, data);
        renderContact($, data);
        renderTopBar($, data);
    }

    var renderTitleSection = function($, data) {
        $("#header-brand-icon").attr("src", data["brandIcon"]);
        $("#header-name").html(data["name"]);
        $("#header-title").html(data["title"]);
    }

    var renderCoverPhoto = function($, data) {
        $("#cover-photo").attr("src", data["coverPhoto"]);
    }

    var renderIntroduction = function($, data) {
        var introElement = $("#introduction");
        data["introduction"].forEach(function(paragraph) {
            introElement.append("<p class='intro-paragraph'>" + paragraph + "</p>");
        });
    }

    var renderKnowledge = function($, data) {
        var knowledgeElement = $("#knowledge");
        var knowledge = data["knowledge"];

        var quote = knowledge["quote"];
        if (quote) {
            knowledgeElement.append("<p class='knowledge-quote'><em>\"" + quote["content"] + "\" - " + quote["credit"] + "</em></p>");
        }

        var intro = knowledge["introduction"];
        if (intro) {
            intro.forEach(function(paragraph) {
                knowledgeElement.append("<p class='knowledge-intro-paragraph'>" + paragraph + "</p>");
            });
        }

        var skills = knowledge["skills"];
        if (skills) {
            renderKnowledgeSkills(knowledgeElement, skills);
        }
    }

    var renderKnowledgeSkills = function(container, skills) {
        var accordionId = "accordionKnowledge";

        var accordionHtml = "<div class='accordion' id='" + accordionId + "'>";

        skills.forEach(function(skill) {
            var skillTitle = skill["title"];
            var skillContent = skill["content"];

            var headingId = "heading" + skillTitle;
            var collapseId = "collapse" + skillTitle;

            var itemHtml = "<div class='accordion-item'>";

            itemHtml += "<h2 class='accordion-header' id='" + headingId + "'>";
            itemHtml += "<button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#" + collapseId + "' aria-expanded='false' aria-controls='" + collapseId + "'>";
            itemHtml += skillTitle;
            itemHtml += "</button>";
            itemHtml += "</h2>";

            itemHtml += "<div id='" + collapseId + "' class='accordion-collapse collapse' aria-labelledby='" + headingId + "'>";
            itemHtml += "<div class='accordion-body'>";
            itemHtml += "<span>" + skillContent + "</span>";
            itemHtml += "</div>";
            itemHtml += "</div>";

            itemHtml += "</div>";
            accordionHtml += itemHtml;
        });

        accordionHtml += "</html>";
        container.append(accordionHtml);
    }

    var renderEducation = function($, data) {
        var education = data["education"];
        $("#education").append("<p class='education-paragraph'>" + education + "</p>");
    }

    var renderContact = function($, data) {
        var contactElement = $("#contact");
        var contactHtml = "<div>";

        var contactList = data["contact"];
        contactList.forEach(function(info) {
            var type = info["type"];
            var link = info["link"];
            var icon = info["icon"];

            var infoHtml = "<div>";

            if (type === "Email") {
                infoHtml += "<a href='mailto:" + link + "' target='_top'>";

                if (icon) {
                    infoHtml += "<img src='" + icon + "' width='28', height='28' />";
                }

                infoHtml += "<span class='contact-link-name'>" + link + "</span>";
                infoHtml += "</a>"

            }
            else {
                infoHtml += "<a href='" + link + "' target='_blank'>";

                if (icon) {
                    infoHtml += "<img src='" + icon + "' width='28', height='28' />";
                }

                infoHtml += "<span class='contact-link-name'>" + type + "</span>";
                infoHtml += "</a>"
            }

            infoHtml += "</div>";
            contactHtml += infoHtml;
        });

        contactHtml += "</div>";
        contactElement.append(contactHtml);
    }

    var renderTopBar = function($, data) {
        var contactElement = $("#topbar");
        var contactHtml = "";

        var contactList = data["contact"];
        contactList.forEach(function(info) {
            var type = info["type"];
            var link = info["link"];
            var icon = info["icon"];

            var infoHtml = "<div class='top-contact-link'>";

            if (type === "Email") {
                infoHtml += "<a href='mailto:" + link + "' target='_top'>";

                if (icon) {
                    infoHtml += "<img src='" + icon + "' width='28', height='28' />";
                }

                infoHtml += "</a>"

            }
            else {
                infoHtml += "<a href='" + link + "' target='_blank'>";

                if (icon) {
                    infoHtml += "<img src='" + icon + "' width='28', height='28' />";
                }

                infoHtml += "</a>"
            }

            infoHtml += "</div>";
            contactHtml += infoHtml;
        });

        var resume = data["resume"];
        var resumeLocation = resume["location"];
        var resumeIcon = resume["icon"];

        contactHtml += "<div class='top-resume'><strong>Resume</strong> <img src='" + resumeIcon + "' width='28' /></div>"
        contactElement.append(contactHtml);
    }

    return {
        render: render 
    }
})()
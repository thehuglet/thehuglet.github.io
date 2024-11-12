'use strict';

function projects_events()
{
	let sort_by = 'Default';
	let done = [];
	let elements = [];

	async function in_animation_check()
	{
		for (let i = 0; i < elements.length; i++)
			if (!done[i] && is_in_viewport(elements[i]))
			{
				if (elements[i].classList.contains('other_project'))
					await sleep(100);

				elements[i].style.opacity = '1';
				elements[i].style.transform = 'translateY(0)';
				done[i] = true;
				await sleep(300);
			}
	}

	window.addEventListener('scroll', (e) =>
	{
		in_animation_check();
	});

	window.addEventListener('resize', (e) =>
	{
		in_animation_check();
	});

	function add_project(project, inverted, featured)
	{
		let tags = '';

		if (featured)
		{
			for (let tag of project.tags)
				tags += `<a href="${tag.url}" target="_blank">${tag.name}</a>`;

			if (window.innerWidth > 780)
			{
				document.querySelector('#projects_section .projects_content').innerHTML += `
					<div class="in_animation project ${inverted ? 'inverted' : ''}">
						<div class="project_text">
							<a class="project_title" href="${project.links[0]}" target="_blank">${project.title}</a>
							<div class="text"><p>${project.description}</p></div>
							<div class="tags">` + tags + `</div>
						</div>
						<div class="project_view">
							<a ${is_safari() ? 'class="safari_fix"' : ''} href="${project.links[0]}" target="_blank">
								<img src="${project.image}" alt="${project.title.toLowerCase()} image" width="1440px" height="810px"/>
								` + (project.video == 'none' || is_safari() ? '' : `
								<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
								<video loop muted preload="metadata">
									<source src="${project.video}" type="video/mp4"/>
								</video>
								`) + `
							</a>
						</div>
					</div>`;
			}

			else
			{
				document.querySelector('#projects_section .projects_content').innerHTML += `
					<div class="in_animation project ${is_safari() ? 'safari_fix' : ''}" style="background-image: url(${project.image});">
						<div class="project_text"">
							<div class="type">
								<span>${project.type}</span>
								<span></span>
								<span>${project.date}</span>
							</div>
							<a class="project_title" href="${project.links[0]}" target="_blank">${project.title}</a>
							<div class="text"><p>${project.description}</p></div>
							<div class="tags">` + tags + `</div>
						</div>
					</div>`;
			}
		}

		else
		{
			for (let tag of project.tags)
				tags += `<span>${tag.name}</span>`;

			document.querySelector('#projects_section .other_projects_content').innerHTML += `
				<div class="in_animation other_project">
					<div class="other_project_content">
						<div class="header">
							<div class="logos">
								<img src="${project.logo}" alt="${project.title.toLowerCase()} logo" width="45px" height="45px"/>
							</div>
							<a href="${project.links[0]}" target="_blank" class="project_title">${project.title}</a>
							<p class="text">${project.description}</p>
						</div>
						<div class="tags">` + tags + `</div>
					</div>
				</div>`;
		}
	}

	function generate(data)
	{
		document.querySelector('#projects_section .projects_content').innerHTML = '';
		document.querySelector('#projects_section .other_projects_content').innerHTML = '';
		let inverted = true;
		let i = 0;

		if (sort_by == 'Date')
		{
			data.projects.sort((a, b) =>
			{
				return b.date - a.date;
			});
		}

		for (let project of data.projects)
		{
			let featured;

			if (sort_by == 'Default' || sort_by == 'Date')
				featured = i < 3;
			else
				featured = project.categories.includes(sort_by);

			if (featured)
				inverted = !inverted;

			add_project(project, inverted, featured);
			i++;
		}

		done = [];
		elements = document.querySelectorAll('#projects_section .in_animation');

		for (let _ of elements)
			done.push(false);

		in_animation_check();
		videos_scroll_event();
	}

	function generate_projects()
	{
		read_json("resources/jsons/projects.json", generate);
	}

	let prev_width = window.innerWidth;
	generate_projects();

	window.addEventListener('resize', () =>
	{
		if ((prev_width >= 780 && window.innerWidth <= 780) || (prev_width <= 780 && window.innerWidth >= 780))
		{
			generate_projects();
			prev_width = window.innerWidth;
		}
	});

	document.querySelectorAll('#projects_section .sort_choices .choice').forEach((el) =>
	{
		el.addEventListener('click', () =>
		{
			sort_by = el.innerHTML;
			generate_projects();

			document.querySelectorAll('#projects_section .sort_choices .choice').forEach((el) =>
			{
				el.classList.remove('selected');
			});

			el.classList.add('selected');
		});
	});
}

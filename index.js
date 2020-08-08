/**
 * README Generator
 */
 const md = require('markdown-it')({
    html: true,
    linkify: true,
    breaks: true
});
const mdEmoji = require('markdown-it-emoji');
const fs = require('fs');
const axios = require('axios').default;

md.use(mdEmoji);

const BLOG_HOST = `https://slim.netlify.app`;

/* README Sections */
const introTitle = generateTitle(2, `Hey :wave:, I'm ${generateLink('Stanley', 'https://stanleylim.me/')}`);
const introDescription = `I'm currently a software engineer **${generateLink(
    '@aws',
    'https://aws.amazon.com/'
)}** based in 🌁 Seattle. I am working on some side projects, learning a couple new dishes, and trying to conquer the world as Tannu Tuva in HOI4.`;

const badgeConfigs = [
    {
        name: 'Website',
        badgeText: 'stanleylim.me',
        labelBgColor: '4E69C8',
        logoBgColor: '4E69C8',
        logo: 'Firefox',
        link: 'https://stanleylim.me',
    },
    {
        name: 'Medium',
        badgeText: '@serbis',
        labelBgColor: '14c767',
        logoBgColor: '14c767',
        logo: 'Medium',
        link: 'https://medium.com/@serbis',
    },
    {
        name: 'LinkedIn',
        badgeText: '@serbis',
        labelBgColor: '0077B5',
        logoBgColor: '0077B5',
        logo: 'LinkedIn',
        link: 'https://www.linkedin.com/in/serbis/',
    },
    {
        name: 'DevTo',
        badgeText: '@spiderpig86',
        labelBgColor: '0A0A0A',
        logoBgColor: '0A0A0A',
        logo: 'dev.to',
        link: 'https://dev.to/spiderpig86',
    },
    {
        name: 'Spotify',
        badgeText: '@Stanley%20Lim',
        labelBgColor: '1ED760',
        logoBgColor: 'fff',
        logo: 'Spotify',
        link: 'https://open.spotify.com/user/1235099575',
    },
];
const badges = badgeConfigs.reduce((result, config) => result + ' ' + generateBadge(config), '');

const gif = `<img align="right" src="https://media1.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" />`;
const factsTitle = generateTitle(2, `:zap: A Few Quick Facts`);
const factsConfigs = [
    `🔭 I’m currently working on [Cirrus](https://github.com/Spiderpig86/Cirrus).`,
    `🧐 Learning about **serverless architectures**, **distributed systems**, and a bit of **ML**.`,
    `👨‍💻 Most of my projects are available on [Github](https://github.com/Spiderpig86).`,
    `📝 I regulary write articles on [my blog](${BLOG_HOST}).`,
    `💬 Ping me about **react, koa, security, and cloud stuff**.`,
    `📙 Check out my [resume](https://www.stanleylim.me/resume/resume.pdf).`,
    `🎉 Fun Fact: 我也会讲中文。`,
];
const facts = factsConfigs.reduce((result, fact) => result + `\n - ${fact}`, '');

const postsTitle = generateTitle(2, `:black_nib: Recent Posts`)

const toolsTitle = generateTitle(2, `:rocket: Some Tools I Use`)
const toolsIconSize = 25;
const toolsConfig = [
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg',
        alt: 'react',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg',
        alt: 'angular-js',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain.svg',
        alt: 'bootstrap',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg',
        alt: 'css3',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/gulp/gulp-plain.svg',
        alt: 'gulp',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg',
        alt: 'html5',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original-wordmark.svg',
        alt: 'java',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
        alt: 'javascript',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
        alt: 'typescript',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg',
        alt: 'mongodb',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg',
        alt: 'mysql',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg',
        alt: 'redis',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg',
        alt: 'nodejs',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original-wordmark.svg',
        alt: 'python',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg',
        alt: 'nginx',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cucumber/cucumber-plain.svg',
        alt: 'cucumber',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/heroku/heroku-plain.svg',
        alt: 'heroku',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/travis/travis-plain.svg',
        alt: 'travis',
    },
    {
        src: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/aws/aws.png',
        alt: 'aws',
    }
];
const tools = toolsConfig.reduce((result, toolConfig) => result + '\n' + generateIcon(toolConfig, toolsIconSize), '');

const stats = `<img src="https://github-readme-stats.vercel.app/api?username=spiderpig86&show_icons=true&count_private=true" alt="spiderpig86" />`;

(async () => {

    // Get blog entries
    const response = await axios.get(`${BLOG_HOST}/page-data/index/page-data.json`);
    const postData = response.data.result.data.allMarkdownRemark.edges;
    let posts = ``;
    
    postData.slice(0, Math.min(postData.length, 5)).map(post => {
        const title = post.node.frontmatter.title;
        const date = post.node.frontmatter.date;
        const path = post.node.frontmatter.path;
        posts += `<li><a target="_blank" href="${BLOG_HOST}${path}">${title} — ${date}</a></li>`;
    });

    const content = `${introTitle}\n
${introDescription}\n
${badges}\n
${gif}\n
${factsTitle}\n
${facts}\n
${postsTitle}\n
<details>
    <summary>Explore</summary>
    ${posts}\n
</details>\n
<a target="_blank" href="${BLOG_HOST}">Read More</a>\n
${toolsTitle}\n
<p align="left">\n
    ${tools}\n
</p>\n
${stats}\n
`;

    const markdownContent = md.render(content);

    fs.writeFile('README.md', markdownContent, (err) => {
        if (err) {
            return console.error(err);
        }
        console.info(`Writing to README.md`);
    });
})();

function generateBadge(badgeConfig) {
    return `[![${badgeConfig.name} Badge](https://img.shields.io/badge/-${badgeConfig.badgeText}-${badgeConfig.labelBgColor}?style=flat-square&labelColor=${badgeConfig.logoBgColor}&logo=${badgeConfig.logo}&link=${badgeConfig.link})](${badgeConfig.link})`;
}

function generateIcon(iconConfig, toolsIconSize) {
    return `<img src="${iconConfig.src}" alt="${iconConfig.alt}" width="${toolsIconSize}" height="${toolsIconSize}" />`;
}

function generateTitle(size, title) {
    return `${'#'.repeat(size)} ${title}`;
}

function generateLink(label, link) {
    return `[${label}](${link})`;
}

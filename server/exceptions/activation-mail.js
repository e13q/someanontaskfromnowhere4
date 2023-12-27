module.exports =
    (to, link) => {
        return {
            from: process.env.SMTP_USER,
            to,
            subject: 'Mail confirmation for an account at ' + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h3>To activate, go <a href="${link}">to the link</a></h3>
                    </div>
                `
        };
    };

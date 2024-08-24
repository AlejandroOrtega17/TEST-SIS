export function morganFormato(tokens, req, res){
    return [
        '[' + tokens.date(req, res, 'clf') + ']',
        '\"' + tokens.method(req, res),
        tokens.url(req, res),
        'HTTP/' + tokens['http-version'](req, res) + '\"',
        'Status: ' + tokens.status(req, res),
        'Message: ' + (res.statusCode >= 400 ? res.statusMessage : '-'),
        tokens['user-agent'](req, res),
        "Referer: " + tokens.referrer(req, res)
    ].join(', ');
}
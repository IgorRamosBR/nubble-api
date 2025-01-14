"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    path: __dirname + '../',
    title: 'api-nubble',
    description: 'Nubble API',
    version: '1.0.0',
    tagIndex: 1,
    ignore: ['/', '/uploads/*', '/swagger', '/docs', '/health'],
    snakeCase: true,
    common: {
        parameters: {
            sortable: [
                {
                    in: 'query',
                    name: 'sortBy',
                    schema: { type: 'string', example: 'foo' },
                },
                {
                    in: 'query',
                    name: 'sortType',
                    schema: { type: 'string', example: 'ASC' },
                },
            ],
        },
        headers: {
            paginated: {
                'X-Total-Pages': {
                    description: 'Total amount of pages',
                    schema: { type: 'integer', example: 5 },
                },
                'X-Total': {
                    description: 'Total amount of results',
                    schema: { type: 'integer', example: 100 },
                },
                'X-Per-Page': {
                    description: 'Results per page',
                    schema: { type: 'integer', example: 20 },
                },
            },
        },
    },
};
//# sourceMappingURL=swagger.js.map
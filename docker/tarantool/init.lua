box.cfg{}

box.once('schema', function()
    box.schema.space.create('messages', {
        if_not_exists = true,
        format = {
            {name = 'id',           type = 'string'},
            {name = 'dialog_id',    type = 'string'},
            {name = 'from_user_id', type = 'string'},
            {name = 'to_user_id',   type = 'string'},
            {name = 'text',         type = 'string'},
            {name = 'created_at',   type = 'number'},
        }
    })

    box.space.messages:create_index('primary', {
        parts         = {{field = 'id', type = 'string'}},
        type          = 'hash',
        if_not_exists = true,
    })

    box.space.messages:create_index('dialog', {
        parts         = {{field = 'dialog_id', type = 'string'}, {field = 'created_at', type = 'number'}},
        type          = 'tree',
        unique        = false,
        if_not_exists = true,
    })

    box.schema.user.grant('guest', 'read,write,execute', 'universe', nil, {if_not_exists = true})
end)

local uuid  = require('uuid')
local clock = require('clock')

local function field_no(space, name)
    for i, f in ipairs(box.space[space]:format()) do
        if f.name == name then return i end
    end
end

local messages_id           = field_no('messages', 'id')
local messages_dialog_id    = field_no('messages', 'dialog_id')
local messages_from_user_id = field_no('messages', 'from_user_id')
local messages_to_user_id   = field_no('messages', 'to_user_id')
local messages_text         = field_no('messages', 'text')
local messages_created_at   = field_no('messages', 'created_at')

function dialog_send(dialog_id, from_user_id, to_user_id, text)
    local id  = tostring(uuid.new())
    local now = clock.realtime()
    box.space.messages:insert{id, dialog_id, from_user_id, to_user_id, text, now}
    return {id}
end

function dialog_list(dialog_id)
    local result = {}
    for _, t in box.space.messages.index.dialog:pairs({dialog_id}, {iterator = 'EQ'}) do
        table.insert(result, {t[messages_id], t[messages_dialog_id], t[messages_from_user_id], t[messages_to_user_id], t[messages_text], t[messages_created_at]})
    end
    return result
end

const { ChatInputCommandInteraction, EmbedBuilder, Client } = require("discord.js")

module.exports = {
    name: "dev-servers",
    description: "Developer Command Only",
    UserPerms: ["Administrator"],
    BotPerms: ["Administrator"],
    category: "Owner",
    /**
     *
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const { user } = interaction

        if (user.id !== "YOURID") return interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor("DarkRed")
                .setDescription("This command is for the developers only!")
            ], ephemeral: true
        })

        let servers = ""
        let count = 0
        client.guilds.cache.forEach((guild) => {
            servers += `Name: ${guild.name} | ID: ${guild.id}\n${guild.memberCount} Members | Owner: ${guild.ownerId}\n\n`
            count += 1
        })

        const LIST = new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} is in ${count} server`, iconURL: client.user.displayAvatarURL() })
            .setColor("DarkButNotBlack")
            .setDescription(`\`\`\`${servers}\`\`\``)
        return interaction.reply({ embeds: [LIST] })
    }
}

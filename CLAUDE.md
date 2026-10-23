# Site de la mosquée En-Nour (Belleville-en-Beaujolais)

Le travail sur ce site est réparti entre six agents définis dans `.claude/agents/`. Leurs rôles, les règles communes et le journal des relais sont dans `docs/EQUIPE-AGENTS.md` : lis-le avant toute modification.

- Pour une demande qui touche plusieurs sujets, commence par `coordinateur-ennour`.
- Quand un agent termine par un bloc « Relais », lance les agents qu'il nomme, dans l'ordre, avec les informations indiquées.
- Tout ce qui sera publié passe en dernier par `relecture-qualite`, puis attend l'accord explicite de Riri. Rien ne va sur `main` sans cet accord.
- Les informations non confirmées sont listées dans `docs/A-CONFIRMER.md` ; ne rien inventer.

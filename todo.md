
# 1. Qu'est ce que tu dois faire? / C'est quoi le projet?
Il est question de develloper une application pour la visualisation graphique de la consommation d´energie a l´institut IDiAL. Linstitut dispose de 2 compteurs principeaux et de 5 Shelly. Les donnees de ces differents compteurs ont ete stocke dans une base de donnees appelle InfluxDB.
Mon project consiste a ce que je developpe un Backend et un frontend. recuperer les donnees de la base de donnes dans le backend et les afficher dans le frontend.

Ainsi, mon travail sera diviser en 2 grandes etapes:

- Etape du backend
- Etape du frontend


# 2. Etape du backend.

J'ai choisi d'utiliser nodejs pour le backend.

Il est question de faire ce qui suit:

## 2.1. creer une application express (nodejs)
## 2.2. dans cette application il faut connecter la base de donnees fourni par le prof.
## 2.3 (DONE) pour chaque compteur et pour chaque shelly, il faut creer un endpoint dui renvois les donnees d'il y a x-heure de temps. le endpoint aura pour input:
    - le temps en heures
    - le nom du shelly

    Ces 3 elements nous permoettrons d'avoir les donnees du shelly specifie' entre les deux temps donnees
## 2.4. (DONE) pour chaque compteur et pour chaque shelly, il faut creer un endpoint. le endpoint aura pour input:
    - la date de but
    - la date de fin
    - le nom du shelly

    Ces 3 elements nous permoettrons d'avoir les donnees du shelly specifie' entre les deux temps donnees

## 2.5. (DONE) envoyer ces donnees vers le frontend.






# 3.  Etape du Frontend

## 3.1. Montrer un graph contenant tous les compteurs et tous les shelly pour les X heure passees.

ce graph doit etre un stack bar chart. Pour cela, on doit avoir 
- les valurs sur les axes des ordonnees (y)
- le temps sur les axes des abscisses (x)
- si le curseur se place sur un point, cela doit afficher la valeur et le nom du compteur.

## 3.2. Creer un calendrier

- pouvoir choisir un temps de debut et un temps de fin
- afficher l'interval de temps choisi

## 3.3 affiche du graph en fonction de l'interval choisi

En fonction du Zeitraum selectionne' on peut afficher en forme de graphe la consummation d´energie qu´il ya eu dans cett interval de temps. Cet Interval de Temps peut et dois varier en fonction de ce que l´utilisateur veut voir. Ca peut etre un interval de temps de 15min, 30min, 45min, 1h etc ou des jours ou des mois.


## 3.4 Konfiguration du l´interval de temps:





Ici on selectionne l´interval de temps en fonction duquelle les valeurs doivent etre affiche.
Ca peut etre un interval de temps de 15min, 30min, 45min, 1h etc

C´est pourquoi des calculs sont neccesaires. Ces calculs peuvent etre fait soit dans le backend soit dans le Frontend. Pour effectuer les calculs il faut savoir c´est quoi la valeurs des 2 points et l´ntervalval de temps entre les deux. Donc Valeur et Temps.
Un exemple on veux savoir la consommation d´energi du Shelly 1 entre 16h et 16h15. A 16h la consommation etait de 28kw et a 16h15 de 87kw. Le temps est de 15 min. Le calcul a effectuer ici sera 87-28/15min ou 1/4. 
Ainsi de suite pour un temps de 30min 1h ou 12h etc

# 2. Comben de graph il faut montrer

Tous les graphes doivent etre montrer graphiquement. Les Compteurs princepeaux et les Shelly. D´apres ce que l´utilsateur aura selectionner

# 3. Algortihm de ce qu'il y a a' faire
1. implementer le Backend
2. recuperer les donner des compteurs de facon individuel de la bases de donner pour le backend
3. creer un frontend
4. Appeler les fonctions du backend dans le frontend afin de les affiche
5. Calendrier
6. Calculs
7. Tableau ausgewählte Zähler verwalten


## 3.1 appeler les donnees/ les compteurs du backend

### (a) ces donnees doivent etre appelees tous ensemble? ou alors individuel?
Individuellement

### (b) les inputs venant du frontend: ???


## 3.2 afficher le graph (stark bar chart) dans le frontend. decrire tout ce que le graph doit avoir

En dessous du graph le temps ou bien plus precisement l´interval de temps seclectionner
A cote sur la droite la consommation en Kwh

## 3.3 Les modifications du graphs 



# 4. Exemple pratique 

La base de donnees envoi des donnees de 3 phase pour chaque shelly.
Ceci dit, nous avons 3 donnees pour un temps X donnees comme le montre le tableau suivant:

Datum                   shelly1                 shelly2   

                        p0,p1,p2                p0,p1,p2

01.03.2023 T10:40       10,20,50                11,23,65          

01.04.2024 T 11:15      20,38,100               34,76,23    

01.05.2023 T 14:10      80,75,150               12,70,85    

01.06.2023 T 15:35      125,97,60               56,98,21    


ici: p0 represente la phase 0, p1 est la phase 1, et p2 est la phase 2.


pour afficher les donnees, nous prenons la moyenne des 3 donnees, et affichons le resultat.

Datum                   shelly1                     shelly2     

01.03.2023 T10:40       (10+20+50)/3                (11+23+65)/3          

01.04.2024 T 11:15      (20+38+100)/3               (34+76+23)/3    

01.05.2023 T 14:10      (80+75+150)/3              (12+70+85)/3    

01.06.2023 T 15:35      (125+97+60)/3              (56+98+21)/3  


ce qui donne le resultat suivant:

Datum                   shelly1           shelly2     

01.03.2023 T10:40       26.67              33          

01.04.2024 T 11:15      52,67              44,34   

01.05.2023 T 14:10      101,67             55,67   

01.06.2023 T 15:35      103                58,34 



01.03.2023 T 10:40 - 01.03.2023 T 23h59 = 13h20 heures = 13h x 60 minutes + 20 = 800 min

02.03.2023 T 10h40 - 31.03.2023  23:59 = 30 jours = 30 x 24h = 720 h = 720h x 60 minutes = 43200 min

01.04.2023 T 00:00 - 30.04.2023 T 23h59 = 30 jours = 720 h =  43200 min

01.05.2023 T 00:00 - 31.05.2023 T 23h59 = 31 jours = 31 x 24h = 744 h = 44640 min

01.06.2023 T 00:00 - 01.06.2023 T 15h35 = 15h35 heures = 935 min



01.06.2023 T15:35 - 01.03.2023 T1040 = 92,20 jours = 2212,92 heures = 132775 minutes = 7966500 second

shelly1         

(103 - 26.67)/ (2212.92) h




# A. Comment preparer le koki?

ceci est un algorithm
## 1. avoir les grains de koki
## 2.optionel trier le koki afin d'emlever les caillou ou autre chose
## 2. tramper le koki
## 3. ecraser le koki
## 4. mettre le koki dan un mortier
## 5. ajouter les ingrdients suivant: sel, ....

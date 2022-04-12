# Report sull'uso di ITreeTools

## file XLS di input
il file XLS di input richiede una serie di valori che attualmente non abbiamo.
altri valori necessitano di essere modificati.

Abbiamo quindi deciso di assegnare questi valori nelle colonne mancanti

- circonferenza chioma N/S E/O: copio il valore della circonferenza predefinita e la duplico, per avere due colonnne con valori uguali ma verosimili (chioma vista come una perfetta circonferenza).
- altezza minima chioma : questo e' un dato derivato da una funzione perche' non previsto nel dataset originale. E' calcolato come il `70%` dell' altezza totale dell' albero.

Dati modulati / modificati:
- Nome specie : mantenuto solamente il nome scientifico della specie.  
Questi nomi ottenuti sono passati tramite un check che controlla errori di battitura o sostituisce alcuni nomi con quelli piu' simili disponibili nel dataset delle specie di ItreeTools. Tutte queste sostituzioni sono disponibili nei file di log.  
E' possibile ottenere il file con i nomi specie piu' recenti da [qua](https://www.itreetools.org/support/resources-overview/i-tree-methods-and-files), sotto `i-Tree Species List`.  
Purtroppo, anche se la lista ufficiale e' aggiornata e le specie del dataset di Trento coincidono, alcune specie in particolare non sono presenti nel dataset di iTree Eco 6.  
Per questa piccola quantita' di specie mancanti, bisogna mapparle da soli durante l' importazione. Nel caso la specie non fosse presente, si mappa con una diversa ma dello stesso genere.
- altezza massima albero : rimosso tutte quelle superiori a `100` metri.
- altezza massima chioma : credo che sia coincidente con quella totale dell' albero quindi e' identica.
- percentuale chioma mancante : Misurazioni completamente mancanti.  
Ho scelto un valore che oscillasse randomicamente fra l' 1% e il 35%, nella speranza che gli alberi di Trento siano messi abbastanza bene.
- Rimosso tutte le entries con note e dettagli 'specie morta' 'pianta morta' e simili.

Moltissime entries non erano popolate con i valori corretti.  
Per alleviare questo problema e' stata fatta una stima sul nome di ogni specie.  
Lo script prende di ogni specie, e per ogni singola specie fa il calcolo di:
- altezza albero media
- diametro tronco medio
- circonferenza chioma media
sfruttando i valori forniti.
Nel caso i valori di una determinata specie non siano sufficienti a calcolare i valori, vengono presi i valori medi dell' intero dataset, in particolare:
- altezza albero : `7.95 m`
- diametro tronco : `28.29 cm`
- circonferenza chioma media : `5.25 m`

I dati della chioma verranno modulati come detto in precedenza.

## Installazione software

Installiamo la software suite ITreeTools dal link della pagina ufficiale:

[Download](https://www.itreetools.org/i-tree-tools-download)

Una volta installato, apriamo

```bash
I-Tree Eco
```

## Configurazione progetto:

Ora ci verra’ presentata la schermata iniziale di ITree Eco 6, dalla quale dovremmo avviare un nuovo progetto.

Andiamo su

```bash
File -> New Project
```

Scegliamo “Complete Inventory” in quanto abbiamo un datasheet completo degli alberi che ci servono (notare come modellare il dataset nei paragrafi successivi).

Chiamiamo il file del progetto come vogliamo e salviamo il file .ieco in una cartella di nostro gradimento.

Nella configurazione del progetto scegliamo un nome per il progetto, e un nome per la serie degli alberi che stiamo usando.

Mettiamo anche l’ anno della serie. Nel nostro caso, un buon middle ground e’ il 2018.

Spostiamoci con il cursore del mouse su `“Location”`.

Inseriamo i dati che ci vengono chiesti, nel caso di Trento in data attuale:

- Italy
- Nord-Est
- Trento (Country)
- Trento
- Area Urban = YES
- Population = 120709
- Density = 760 km2
- Weather & Pollution Year : 2015 (ultimo anno utile dove sono reperibili anche i dati di inquinamento)
- Weather Station : clicchiamo sui “Show Map” e scegliamo la stazione meteo che piu’ e’ consona.

Ci spostiamo con il cursore del mouse su “Data Collection Options” per selezionare le informazioni che passiamo al software con il nostro dataset di alberi.

- Unita’ : Metric

Tra la tabella delle informazioni da scegliere, selezioniamo:

- Map (GPS) Coordinates
- Total Tree Height
- Crown Size

Putroppo non possiamo scegliere altri dati in quanto non ci sono disponibili con il dataset attuale.

Possiamo confermare le impostazioni del progetto selezionando “OK” in alto a destra.

Ci verra’ mostrato un messaggio di avviso, che ci informa che lo stato della chioma verra’ stimato ad un 87% in quanto il dato e’ necessario per i calcoli che vengono fatti con le informazioni della chioma, ma non e’ disponibile.

Accettiamo.

Ci verranno mostrati gli argomenti del report che sara’ possibile generare con le informazioni provvedute.

## Importazione dataSet alberi.

Muoviamoci nel sottomenu’ “Data”, in alto.

Selezioniamo “Trees”. Questa azione ci consentira’ di importare il dataset.

Clicchiamo su “Import”.

Ora ci verra’ presentata una schermata con tutte le impostazioni necessarie per una corretta importazione del dataset.

- Next
- Scegliamo il file del dataSet che abbiamo generato successivamente alla modifica tramite lo script python.
- Selezioniamo “First row contains column headers”
- Next

Ora e’ arrivato il momento di mappare ogni colonna al suo dato all’ interno di ItreeTools. Questo permette al programma di pescare correttamente i dati.  
Nel caso il dataset fosse troppo grande, si puo' ridimensionare la finestra del programma per avere una visuale migliore.  
Selezionare la colonna che si vuole mappare e assegnare i corrispettivi campi tramite i menu' a scelta in basso a sinistra.

`Per ogni assegnazione fatta e' molto meglio selezionare anche la casella in basso a sinistra, che permette di mappare eventuali valori non riconosciuti da ITree "a mano".`

Il nome delle colonne dovrebbe dare una indicazione di che informazione contiene.  
Notare che la colonna `h_m` rappresenta l' ALTEZZA TOTALE dell' albero, inoltre nomi delle specie sono `scientific names`.  

Una volta fatto il tutto andiamo avanti dove potremmo mappare ogni singolo valore non riconosciuto dal programma.  
Andiamo specialmente sulle `Species`, e mappiamo le specie che mancano con i nomi piu' appropriati.  
Alcune sono semplicemente nascoste sotto altri nomi che riusciamo a trovare, altre mancano completamente e devo essere sostituiti con altre variazioni della stessa specie.  

Una volta fatto questo, andare avanti.  
Il caricamento ci mettera' un po'.

Successivamente, per generare il report, andare su:
- Benefit Prices (in alto nella stessa schermata).
Da qui e' possibile inserire correttamente il costo delle varie materie prime a seconda del luogo, e ottenere dalla rete il tasso di conversione attuale `USD/EUR`.  

Ora cambiamo schermata e andiamo in `Report`.  
Cliccando su `Project Metadata` possiamo vedere quello che verra' generato dal report, se il modello e' gia' stato fatto andare, quanti alberi verranno inviati al report ecc.  
Inviamo ora i dati ai server di ITree per ottenre il report adatto sul nostro dataSet.  

Clickiamo `Submit Data for Processing`.  
Questo step validera' tutti i dati e ci indichera' quali e se abbiamo problemi con i nostri dati.  
Nel caso ci fossero problemi, ritorniamo nella parte della tabella con gli alberi e modifichiamo di conseguenza.  

Se e' tutto ok, inseriamo i dati richiesti (conta specialmente la e-mail), e inviamo i dati per l' elaborazione.  
Da esperienza la email con il nome del progetto eleborato arrivera' in circa 20 minuti, ma potrebbero volercene di piu' come di meno, a seconda della queue dei server.  
Una volta ottenuta la mail, fare click sul terzo pulsante: `Track and Retrieve Results`.  
Lasciare scaricare i dati necessari al programma.  

Alla fine del processo gli altri bottoni diverranno clickabili e avremmo la possibilita' di visionare tutti i report necessari.

Per salvare un report in versione XLS o XLSX, entrare nel report di interesse:
- fare click sull' icona di salvataggio in alto a sinistra della visualizzazione del PDF.
- scegliere un nome per il file da salvare e cambiare il formato file in `xlsx`.
- lasciare i dati nella finestra di popup che compare ai loro valori di default (o provare a cambiarli nel caso il risultato non fosse di gradimento).  

`Notare che questo processo funziona estremamente meglio con report gia' strutturati sotto forma di tables. Nel caso il report generato avesse troppa grafica o simili, il file xlsx potrebbe risultare incomprensibile / difficilissimo da modulare per usi successivi.`  




# Uso degli script Python

## Premessa
Gli script Python servono a cambiare la struttura dei dati che abbiamo preso direttamente dal Comune di Trento.<br/>
Per avere successo con la conversione, guardare la struttura iniziale dei file presenti csv/xls/xlsx all' interno di [Data](data).

## Script 1
Il file [datasetFixer.ipynb](/../../tree/master/code/datasetFixer.ipynb) e' un file scritto in Jupyter che analizza il dataset iniziale di 'alberi_trento.xls' e lo combina con la lista delle specie valide di ITreeTools.<br/>
Questo permette di rimuovere qualsiasi albero non abbia dati a sufficienza per essere analizzato con ITreeTools.<br/>
Alcuni nomi delle specie non sono scritti in modo corretto. Lo script tenta di appossimare il nome piu' vicino. La percentuale di similarità e' salvata nel file chiamato 'Substitute species.txt'.<br/>
Successivamente, per alberi che hanno abbastanza dati da essere accettati, ma non abbastanza da essere completi, lo script applica dati stimati sulla specie che sta analizzando.<br/>
E' possibile controllare i dati statistici di ogni specie analizzata nel file "analyzeDataperSpecies.txt".<br/>
Il file di output risulta essere 'modifiedDataset.xlsx'.

## Script 2
Il file [dataModeling.ipynb](/../../tree/master/code/dataModeling.ipynb) unisce i dati di vari report per generare un file geojson rappresentante ogni singolo albero e i buoi benefits.<br/>
Richiede i file 'full report per tree.xlsx', 'modifiedDataset.xlsx' (in una cartella padre, output dello script precedente), 'composition recap.xlsx' e 'oxygen recap.xlsx'. <br/>
Tutti questi report si riferiscono al singolo albero e sono esporabili dal software i-Tree Eco, come spiegato [qua](doc/itreetools.md).<br/>
Il file di output saranno ''modifiedReport.xlsx', che rappresenta un report generale con tutti i dati processati, e 'geo_data_trees.geojson' che viene utilizzato nella WebApp.

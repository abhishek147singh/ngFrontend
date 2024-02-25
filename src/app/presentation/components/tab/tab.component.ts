import { AfterContentInit, Component, ContentChildren, QueryList, ViewChild } from '@angular/core';
import { TabContentComponent } from '../tab-content/tab-content.component';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})

export class TabComponent implements AfterContentInit {
  @ContentChildren(TabContentComponent) tabs: QueryList<TabContentComponent> = new QueryList<TabContentComponent>();

  activeTabIndex:number = 0;

  selectTab(tabIndex:number) {
    this.activeTabIndex = tabIndex;
    const tabsArray = this.tabs.toArray();
    
    tabsArray.forEach(t => {
      t.isActive = false;
    });

    tabsArray[tabIndex].isActive = true;        
  }

  ngAfterContentInit(): void {
    if(this.tabs.length > 0){  
      setTimeout(() => { this.selectTab(0);})
    }
  }
}

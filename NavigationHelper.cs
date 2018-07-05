using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace SmarterBalanced.SpanishEnglishDemarcation
{
    public static class NavigationHelper
    {
        private static List<string> s_viewList = new List<string>() { "item2803", "item3298", "item3318", "item3527", "item3561", "item3593", "item3599", "item3607", "item3627", "item3635", "item3694", "item3695" };

        public static string GetNextUrl(string currentUrl)
        {
            return NavigationHelper.GetModifiedUrl(currentUrl, 1);
        }

        public static string GetPreviousUrl(string currentUrl)
        {
            return NavigationHelper.GetModifiedUrl(currentUrl, -1);
        }

        private static string GetModifiedUrl(string currentUrl, int indexModifier)
        {
            string result = null;
            string currentView = NavigationHelper.GetCurrentViewName(currentUrl);
            int index = s_viewList.IndexOf(currentView.ToLower());

            if (index >= 0
            && index + indexModifier >= 0
            && index + indexModifier <= s_viewList.Count - 1) //make sure item is found and next item exists in list
            {
                result = NavigationHelper.GetControllerPath(currentUrl) + "/" + s_viewList[index + indexModifier];
            }

            return result;
        }

        private static string GetCurrentViewName(string currentUrl)
        {
            string result = currentUrl.TrimEnd('/');
            int lastIndex = result.LastIndexOf("/");

            if (lastIndex >= 0)
            {
                result = result.Substring(lastIndex, result.Length);
            }

            return result;
        }

        private static string GetControllerPath(string currentUrl)
        {
            string result = currentUrl.TrimEnd('/');

            result = result.Substring(0, result.LastIndexOf("/"));

            return result;
        }
    }
}